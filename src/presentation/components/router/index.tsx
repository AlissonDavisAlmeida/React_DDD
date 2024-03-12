import { Login } from '@/presentation/pages/login';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <div data-testid='home-page'>home</div>

  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <div data-testid='signup-page'>signup</div>
  }
]);
