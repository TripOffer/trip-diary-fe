import BaseApi from '../shared';
import {
  UserListQuery,
  UserListRes,
  UserDetailRes,
  MyUserDetailRes,
  UpdateUserReq,
  UpdateUserRes,
  UpdateAvatarReq,
  UpdateAvatarRes,
  ChangeRoleReq,
  ChangeRoleRes,
  FollowRes,
  UnfollowRes,
  FollowListQuery,
  FollowingListRes,
  FollowersListRes,
  FollowStatsRes,
} from './types';

class UserApi extends BaseApi {
  urls = {
    list: '/user/list',
    detail: (id: number | string) => `/user/${id}`,
    me: '/user/me',
    update: '/user/me',
    updateAvatar: '/user/me/avatar',
    changeRole: (id: number | string) => `/user/profile/${id}/role`,
  };

  tag = 'User';

  async getUserList(params: UserListQuery) {
    return this.http.get<UserListRes>(this.urls.list, { params });
  }

  async getUserDetail(id: number | string) {
    return this.http.get<UserDetailRes>(this.urls.detail(id));
  }

  async getMyDetail() {
    return this.http.get<MyUserDetailRes>(this.urls.me);
  }

  async updateMyInfo(data: UpdateUserReq) {
    return this.http.put<UpdateUserRes>(this.urls.update, data);
  }

  async updateAvatar(data: UpdateAvatarReq) {
    return this.http.put<UpdateAvatarRes>(this.urls.updateAvatar, data);
  }

  async changeRole(id: number | string, data: ChangeRoleReq) {
    return this.http.put<ChangeRoleRes>(this.urls.changeRole(id), data);
  }

  async followUser(id: number | string) {
    return this.http.put<FollowRes>(`/user/${id}/follow`);
  }

  async unfollowUser(id: number | string) {
    return this.http.put<UnfollowRes>(`/user/${id}/unfollow`);
  }

  async getFollowingList(id: number | string, params: FollowListQuery = {}) {
    return this.http.get<FollowingListRes>(`/user/${id}/following`, { params });
  }

  async getFollowersList(id: number | string, params: FollowListQuery = {}) {
    return this.http.get<FollowersListRes>(`/user/${id}/followers`, { params });
  }

  async getFollowStats(id: number | string) {
    return this.http.get<FollowStatsRes>(`/user/${id}/follow-stats`);
  }
}

export const userApi = new UserApi();
