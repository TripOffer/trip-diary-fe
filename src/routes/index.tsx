import PublishPage from '@/pages/publish';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import App from '../App';
import DiaryDetail from '../pages/diary/detail';
import Home from '../pages/home';
import Login from '../pages/login';
import Profile from '../pages/profile';
import ProfileEdit from '../pages/profile/edit';
import Search from '../pages/search';
import UserProfile from '../pages/user';
import PublishEditPage from '../pages/publish/edit';
import SettingPage from '../pages/setting';
import UserAgreementPage from '../pages/agreement';
import PrivacyPolicyPage from '../pages/privacy';
import FollowList from '../pages/profile/components/FollowList';
import PreferencePage from '../pages/setting/preference';
import CommonSettingPage from '../pages/setting/common';
import { useAuthStore } from '@/store/auth';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    // 派发清空 KeepAlive 缓存事件
    window.dispatchEvent(new Event('clear-keep-alive-cache'));
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route
        path="publish"
        element={
          <ProtectedRoute>
            <PublishPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="publish/edit"
        element={
          <ProtectedRoute>
            <PublishEditPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="profile/edit"
        element={
          <ProtectedRoute>
            <ProfileEdit />
          </ProtectedRoute>
        }
      />
      <Route
        path="profile/following"
        element={
          <ProtectedRoute>
            <FollowList />
          </ProtectedRoute>
        }
      />
      <Route
        path="profile/followers"
        element={
          <ProtectedRoute>
            <FollowList type="followers" />
          </ProtectedRoute>
        }
      />
      <Route
        path="setting"
        element={
          <ProtectedRoute>
            <SettingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="setting/preference"
        element={
          <ProtectedRoute>
            <PreferencePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="setting/common"
        element={
          <ProtectedRoute>
            <CommonSettingPage />
          </ProtectedRoute>
        }
      />
      <Route path="login" element={<Login />} />
      <Route path="diary/:id" element={<DiaryDetail />} />
      <Route path="user/:id" element={<UserProfile />} />
      <Route path="agreement" element={<UserAgreementPage />} />
      <Route path="privacy" element={<PrivacyPolicyPage />} />
    </Route>
    <Route path="search" element={<Search />} />
  </Routes>
);

export default AppRoutes;
