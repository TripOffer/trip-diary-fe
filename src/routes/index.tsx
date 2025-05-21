import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home';
import DiaryDetail from '../pages/diary/detail';
import { useAuthStore } from '@/store/auth';

const PublishPage = React.lazy(() => import('@/pages/publish'));
const CommentPage = React.lazy(() => import('../pages/diary/components/CommentPage'));
const Login = React.lazy(() => import('../pages/login'));
const Profile = React.lazy(() => import('../pages/profile'));
const ProfileEdit = React.lazy(() => import('../pages/profile/edit'));
const Search = React.lazy(() => import('../pages/search'));
const UserProfile = React.lazy(() => import('../pages/user'));
const PublishEditPage = React.lazy(() => import('../pages/publish/edit'));
const SettingPage = React.lazy(() => import('../pages/setting'));
const UserAgreementPage = React.lazy(() => import('../pages/agreement'));
const PrivacyPolicyPage = React.lazy(() => import('../pages/privacy'));
const FollowList = React.lazy(() => import('../pages/profile/components/FollowList'));
const PreferencePage = React.lazy(() => import('../pages/setting/preference'));
const CommonSettingPage = React.lazy(() => import('../pages/setting/common'));
const SupportChatPage = React.lazy(() => import('../pages/setting/support'));
const AboutPage = React.lazy(() => import('../pages/setting/about'));

// 加载状态组件
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="w-12 h-12 border-4 border-t-primary border-gray-200 rounded-full animate-spin"></div>
  </div>
);

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
  <Suspense fallback={<LoadingFallback />}>
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
        <Route
          path="setting/support"
          element={
            <ProtectedRoute>
              <SupportChatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="setting/about"
          element={
            <ProtectedRoute>
              <AboutPage />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="diary/:id" element={<DiaryDetail />} />
        <Route
          path="diary/:id/comments"
          element={
            <ProtectedRoute>
              <CommentPage />
            </ProtectedRoute>
          }
        />
        <Route path="user/:id" element={<UserProfile />} />
        <Route path="agreement" element={<UserAgreementPage />} />
        <Route path="privacy" element={<PrivacyPolicyPage />} />
      </Route>
      <Route path="search" element={<Search />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
