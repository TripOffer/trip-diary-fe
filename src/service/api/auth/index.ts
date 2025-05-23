import BaseApi from '../shared';
import {
  SendCodeReq,
  RegisterReq,
  LoginReq,
  ChangePasswordReq,
  DeleteAccountReq,
  LoginResData,
  SendCodeResData,
  RegisterResData,
  ChangePasswordResData,
  DeleteAccountResData,
  ResetPasswordReq,
  ResetPasswordResData,
} from './types';

class AuthApi extends BaseApi {
  urls = {
    login: '/auth/login',
    register: '/auth/register',
    sendCode: '/auth/send-code',
    changePassword: '/auth/change-password',
    deleteAccount: '/auth',
    getUserInfo: '/auth/info',
    resetPassword: '/auth/reset-password',
  };

  tag = 'Auth';

  async sendCode(data: SendCodeReq) {
    return this.http.post<SendCodeResData>(this.urls.sendCode, data);
  }

  async register(data: RegisterReq) {
    return this.http.post<RegisterResData>(this.urls.register, data);
  }

  async login(data: LoginReq) {
    return this.http.post<LoginResData>(this.urls.login, data);
  }

  async changePassword(data: ChangePasswordReq) {
    return this.http.put<ChangePasswordResData>(this.urls.changePassword, data);
  }

  async deleteAccount(data: DeleteAccountReq) {
    return this.http.delete<DeleteAccountResData>(this.urls.deleteAccount, { data });
  }

  async resetPassword(data: ResetPasswordReq) {
    return this.http.post<ResetPasswordResData>(this.urls.resetPassword, data);
  }
}

export const authApi = new AuthApi();
