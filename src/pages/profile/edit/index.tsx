import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Input,
  Cell,
  Button,
  Message,
  Avatar,
  Loading,
  Dialog,
  Calendar,
} from 'tdesign-mobile-react';
import { Icon } from '@iconify/react';
import { userApi } from '@/service/api/user';
import { MyUserDetailData, Gender, UpdateUserReq } from '@/service/api/user/types';
import { uploadResource } from '@/utils/upload';
import { useAuthStore } from '@/store/auth';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';

interface ApiResponse {
  code: number;
  msg: string;
  data: MyUserDetailData;
}

const OSS_PREFIX = import.meta.env.VITE_OSS_URL || '';

const ProfileEdit: React.FC = () => {
  const { t } = useTranslation('profile');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);

  const [userData, setUserData] = useState<MyUserDetailData | null>(null);
  const [form, setForm] = useState<UpdateUserReq>({
    name: '',
    bio: '',
    gender: 'secret',
    birthday: '',
  });

  const genderOptions = [
    { label: t('genderSecret'), value: 'secret' },
    { label: t('genderMale'), value: 'male' },
    { label: t('genderFemale'), value: 'female' },
  ];

  // 头像上传相关
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState('');

  // 格式化日期显示
  const formatDate = (dateStr: string | number | null | undefined) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  // 日期格式化（从Date对象）
  const formatDateFromObj = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  // 获取用户详情数据
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const result = (await userApi.getMyDetail()) as unknown as ApiResponse;

        if (result && result.code === 0 && result.data) {
          const userData = result.data;
          setUserData(userData);

          // 更新表单数据
          setForm({
            name: userData.name,
            bio: userData.bio || '',
            gender: userData.gender,
            birthday: userData.birthday || '',
          });

          // 设置头像URL
          if (userData.avatar) {
            setAvatarUrl(
              userData.avatar.startsWith('http') ? userData.avatar : OSS_PREFIX + userData.avatar,
            );
          }
        } else {
          throw new Error('Invalid response data');
        }
      } catch (error) {
        Message.error({
          content: t('fetchUserFailed'),
          duration: 2000,
        });
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [t]);

  // 处理表单输入变化
  const handleInputChange = (field: keyof UpdateUserReq, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // 处理性别选择变化
  const handleGenderChange = (value: Gender) => {
    setForm((prev) => ({ ...prev, gender: value }));
  };

  // 处理生日选择变化
  const handleCalendarConfirm = (value: Date) => {
    const formattedDate = formatDateFromObj(value);
    setForm((prev) => ({ ...prev, birthday: formattedDate }));
    setCalendarVisible(false);
  };

  // 处理头像点击
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // 处理头像文件变更
  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // 上传头像到OSS
      const ossObject = await uploadResource(file, 'thumb');
      if (!ossObject || !ossObject.key) {
        throw new Error('OSS上传失败，未返回有效的key');
      }

      // 更新用户头像
      const response = await userApi.updateAvatar({ avatar: ossObject.key });
      if (response && response.data) {
        const newAvatarUrl = OSS_PREFIX + ossObject.key;
        setAvatarUrl(newAvatarUrl);

        // 更新auth store中的用户头像
        if (authUser) {
          setAuthUser({
            ...authUser,
            avatar: ossObject.key,
          });
        }

        Message.success(t('avatarUpdateSuccess'));
      }
    } catch (error) {
      Message.error(t('avatarUpdateFailed'));
      console.error('Avatar update error:', error);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // 保存个人信息
  const handleSubmit = async () => {
    if (submitting) return;

    try {
      setSubmitting(true);

      // 验证必填字段
      if (!form.name?.trim()) {
        Message.error(t('nameRequired'));
        return;
      }

      const response = await userApi.updateMyInfo(form);

      if (response && response.data) {
        // 同步更新auth store中的用户信息
        if (authUser) {
          setAuthUser({
            ...authUser,
            name: form.name,
            bio: form.bio || null,
          });
        }

        Message.success(t('saveSuccess'));
        // 更新成功后返回个人主页
        setTimeout(() => {
          navigate('/profile', { replace: true });
        }, 1200);
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      Message.error(t('saveFailed'));
      console.error('Update error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    const hasChanges =
      userData &&
      JSON.stringify({
        name: form.name,
        bio: form.bio,
        gender: form.gender,
        birthday: form.birthday,
      }) !==
        JSON.stringify({
          name: userData.name,
          bio: userData.bio || '',
          gender: userData.gender,
          birthday: userData.birthday || '',
        });

    if (hasChanges) {
      Dialog?.confirm?.({
        title: t('unsavedConfirmTitle'),
        content: t('unsavedConfirmContent'),
        confirmBtn: t('unsavedConfirmOk'),
        cancelBtn: t('unsavedConfirmCancel'),
        onConfirm: () => navigate('/profile'),
        onCancel: () => console.log('取消离开'),
      });
    } else {
      navigate('/profile');
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <Loading>{t('loading')}</Loading>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.backButton} onClick={handleBack}>
          <Icon icon="mdi:arrow-left" />
        </div>
        <h1 className={styles.title}>{t('editProfileTitle')}</h1>
        <div className={styles.dummySpace}></div>
      </div>

      <div className={styles.content}>
        {/* 头像部分 */}
        <div className={styles.avatarSection} onClick={handleAvatarClick}>
          {avatarUrl ? (
            <div className={styles.avatarWrapper}>
              <Avatar
                className={styles.avatarLarge}
                shape="circle"
                size="large"
                image={avatarUrl}
                alt={form.name || ''}
              />
              <div className={styles.changeAvatarHint}>
                <Icon icon="mdi:camera" width="16" height="16" />
                <span>{t('avatarChange')}</span>
              </div>
            </div>
          ) : (
            <div className={styles.emptyAvatar}>
              <Icon icon="mdi:account" width="48" height="48" color="#CCCCCC" />
              <div className={styles.uploadHint}>
                <Icon icon="mdi:camera" width="16" height="16" />
                <span>{t('avatarUpload')}</span>
              </div>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </div>

        {/* 基本信息表单 */}
        <div className={styles.form}>
          <Cell
            title={t('name')}
            align="middle"
            description={
              <Input
                placeholder={t('namePlaceholder')}
                value={form.name}
                onChange={(value) => handleInputChange('name', String(value))}
                maxlength={20}
                clearable
              />
            }
          />

          <Cell
            title={t('id')}
            align="middle"
            description={<div className={styles.readonlyValue}>{userData?.id}</div>}
          />

          <Cell
            title={t('bio')}
            align="middle"
            description={
              <Input
                placeholder={t('bioPlaceholder')}
                value={form.bio}
                onChange={(value) => handleInputChange('bio', String(value))}
                maxlength={100}
                clearable
              />
            }
          />

          <Cell
            title={t('gender')}
            align="middle"
            description={
              <div className={styles.genderButtons}>
                {genderOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={form.gender === option.value ? 'base' : 'outline'}
                    size="small"
                    style={{ marginRight: '8px' }}
                    onClick={() => handleGenderChange(option.value as Gender)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            }
          />

          <Cell
            title={t('birthday')}
            align="middle"
            arrow
            onClick={() => setCalendarVisible(true)}
            description={
              <div className={styles.dateValue}>
                {form.birthday ? formatDate(form.birthday) : t('birthdayUnset')}
              </div>
            }
          />

          <Cell
            title={t('email')}
            align="middle"
            description={<div className={styles.readonlyValue}>{userData?.email}</div>}
          />
        </div>

        {/* 保存按钮 */}
        <div className={styles.saveButtonContainer}>
          <Button
            block
            theme="primary"
            loading={submitting}
            disabled={submitting}
            onClick={handleSubmit}
            className={styles.saveButton}
          >
            {t('save')}
          </Button>
        </div>
      </div>

      {/* 日历组件 */}
      <Calendar
        visible={calendarVisible}
        onConfirm={handleCalendarConfirm}
        onClose={() => setCalendarVisible(false)}
        value={form.birthday ? new Date(form.birthday) : new Date()}
      />
    </div>
  );
};

export default ProfileEdit;
