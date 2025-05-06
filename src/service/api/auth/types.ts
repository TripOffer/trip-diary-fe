import { ApiRes } from '../shared';

// 用户性别
export type Gender = 'secret' | 'male' | 'female';

// 用户角色
export type Role = 'User' | 'Admin' | 'Reviewer';

// 用户信息
export interface UserInfo {
  id: number;
  name: string;
  email: string;
  gender: Gender;
  avatar: string | null;
  bio: string | null;
  role: Role;
  birthday: string | null;
  createdAt: string;
  updateAt?: string; // 有的接口为 updatedAt
}

// 注册
export interface RegisterReq {
  email: string;
  password: string;
  code: string;
}
export type RegisterResData = { token: string; user: UserInfo };
export type RegisterRes = ApiRes<RegisterResData>;

// 登录
export interface LoginReq {
  email: string;
  password: string;
}
export type LoginResData = { token: string; user: UserInfo };
export type LoginRes = ApiRes<LoginResData>;

// 注销
export interface DeleteAccountReq {
  password: string;
  code: string;
}
export type DeleteAccountResData = { success: boolean; message: string };
export type DeleteAccountRes = ApiRes<DeleteAccountResData>;

// 修改密码
export interface ChangePasswordReq {
  oldPassword: string;
  newPassword: string;
}
export type ChangePasswordResData = { success: boolean; message: string };
export type ChangePasswordRes = ApiRes<ChangePasswordResData>;

// 发送验证码
export interface SendCodeReq {
  email: string;
}
export type SendCodeResData = { success: boolean; message: string };
export type SendCodeRes = ApiRes<SendCodeResData>;

// 重置密码
export interface ResetPasswordReq {
  email: string;
  newPassword: string;
  code: string;
}
export type ResetPasswordResData = { success: boolean; message: string };
export type ResetPasswordRes = ApiRes<ResetPasswordResData>;
