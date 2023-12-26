import { Login } from '@/presentation/pages/login';
import { createBrowserRouter } from 'react-router-dom';
import '@/presentation/styles/global.scss';

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login
  }
]);
