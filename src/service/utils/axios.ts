import axios from 'axios';
import { useAuthStore } from '@/store/auth';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    // 处理成功的响应
    if (typeof response.data === 'string') {
      try {
        const data = JSON.parse(response.data);
        console.log('API 响应数据:', data);
        return data;
      } catch (error) {
        console.warn('API 响应数据无法解析为 JSON:', error);
        return response.data;
      }
    }
    // 处理服务器返回200但实际上是错误的情况（例如：返回code: 403）
    if (response.data && response.data.code === 403) {
      console.log('服务器返回403权限错误，正在跳转到登录页面');
      window.location.href = '/auth/login';
      return Promise.reject(new Error('Unauthorized'));
    }
    return response.data;
  },
  (error) => {
    // 处理响应错误
    console.error('API 错误:', error.response || error.message);
    // 处理 403 错误，跳转到登录页面
    if (error.response && error.response.status === 403) {
      console.log('权限错误或Token无效，正在跳转到登录页面');
      // 清除 token
      useAuthStore.getState().clearToken();
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  },
);

export { http };
