import PublishPage from '@/pages/publish';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from '../App';
import DiaryDetail from '../pages/diary';
import Home from '../pages/home';
import Login from '../pages/login';
import Profile from '../pages/profile';
import Search from '../pages/search';
import UserProfile from '../pages/user';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="publish" element={<PublishPage />} />
      <Route path="profile" element={<Profile />} />
      <Route path="login" element={<Login />} />
    </Route>
    <Route path="search" element={<Search />} />
    <Route path="diary/:id" element={<DiaryDetail />} />
    <Route path="user/:id" element={<UserProfile />} />
  </Routes>
);

export default AppRoutes;
