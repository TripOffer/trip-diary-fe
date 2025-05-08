import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import Login from '../pages/login';
import DiaryCreate from '../pages/create';
import Search from '../pages/search';
import DiaryDetail from '../pages/diary';
import UserProfile from '../pages/user';
import Home from '../pages/home';
import Profile from '../pages/profile';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="profile" element={<Profile />} />
      <Route path="login" element={<Login />} />
    </Route>
    <Route path="create" element={<DiaryCreate />} />
    <Route path="search" element={<Search />} />
    <Route path="diary/:id" element={<DiaryDetail />} />
    <Route path="user/:id" element={<UserProfile />} />
  </Routes>
);

export default AppRoutes;
