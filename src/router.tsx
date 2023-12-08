import { lazy } from 'react';

import { ErrorPage } from './components/pages/ErrorPage';

const App = lazy(() => import('./components/App/App'));

const HomePage = lazy(() => import('./components/pages/HomePage/HomePage'));
const CartPage = lazy(() => import('./components/pages/CartPage/CartPage'));

const SignUpPage = lazy(() => import('./components/pages/LoginPage/SignUpPage'));
const LoginPage = lazy(() => import('./components/pages/LoginPage/LoginPage'));

const ProductPage = lazy(() => import('./components/pages/ProductPage/ProductPage'));
const SearchPage = lazy(() => import('./components/pages/SearchPage/SearchPage'));

export const router = [
  {
    children: [
      {
        element: <HomePage />,
        path: '',
      },
      {
        element: <CartPage />,
        path: 'cart',
      },

      {
        element: <ProductPage />,
        path: 'restaurant/:restaurantId/product/:id',
      },
      {
        element: <SearchPage />,
        path: 'search',
      },
      {
        element: <LoginPage />,
        path: 'login',
      },
      {
        element: <SignUpPage />,
        path: 'register',
      },
    ],
    element: <App />,
    errorElement: <ErrorPage />,
    path: '/',
  },
];
