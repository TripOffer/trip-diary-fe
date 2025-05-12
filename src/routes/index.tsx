import PublishPage from '@/pages/publish';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import App from '../App';
import DiaryDetail from '../pages/diary';
import Home from '../pages/home';
import Login from '../pages/login';
import Profile from '../pages/profile';
import Search from '../pages/search';
import UserProfile from '../pages/user';
import PublishEditPage from '../pages/publish/edit';
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
      <Route path="login" element={<Login />} />
      <Route path="diary/:id" element={<DiaryDetail />} />
      <Route path="user/:id" element={<UserProfile />} />
    </Route>
    <Route path="search" element={<Search />} />
  </Routes>
);

export default AppRoutes;
