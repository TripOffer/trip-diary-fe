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
import styles from './index.module.scss';

interface ApiResponse {
  code: number;
  msg: string;
  data: MyUserDetailData;
}

const OSS_PREFIX = import.meta.env.VITE_OSS_URL || '';

const genderOptions = [
  { label: '未知', value: 'secret' },
  { label: '男', value: 'male' },
  { label: '女', value: 'female' },
];

const ProfileEdit: React.FC = () => {
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
          content: '获取用户信息失败',
          duration: 2000,
        });
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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

        Message.success('头像更新成功');
      }
    } catch (error) {
      Message.error('头像更新失败，请重试');
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
        Message.error('名字不能为空');
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

        Message.success('个人资料更新成功');
        // 更新成功后返回个人主页
        setTimeout(() => {
          navigate('/profile', { replace: true });
        }, 1200);
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      Message.error('更新失败，请重试');
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
        title: '提示',
        content: '您的修改尚未保存，确定要离开吗？',
        confirmBtn: '确定',
        cancelBtn: '取消',
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
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.backButton} onClick={handleBack}>
          <Icon icon="mdi:arrow-left" />
        </div>
        <h1 className={styles.title}>编辑资料</h1>
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
                <span>更换头像</span>
              </div>
            </div>
          ) : (
            <div className={styles.emptyAvatar}>
              <Icon icon="mdi:account" width="48" height="48" color="#CCCCCC" />
              <div className={styles.uploadHint}>
                <Icon icon="mdi:camera" width="16" height="16" />
                <span>上传头像</span>
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
            title="名字"
            align="middle"
            description={
              <Input
                placeholder="请输入名字"
                value={form.name}
                onChange={(value) => handleInputChange('name', String(value))}
                maxlength={20}
                clearable
              />
            }
          />

          <Cell
            title="旅游日记ID号"
            align="middle"
            description={<div className={styles.readonlyValue}>{userData?.id}</div>}
          />

          <Cell
            title="个性签名"
            align="middle"
            description={
              <Input
                placeholder="请输入个性签名"
                value={form.bio}
                onChange={(value) => handleInputChange('bio', String(value))}
                maxlength={100}
                clearable
              />
            }
          />

          <Cell
            title="性别"
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
            title="生日"
            align="middle"
            arrow
            onClick={() => setCalendarVisible(true)}
            description={
              <div className={styles.dateValue}>
                {form.birthday ? formatDate(form.birthday) : '未设置'}
              </div>
            }
          />

          <Cell
            title="邮箱"
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
            保存
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
