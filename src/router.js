import { lazy } from 'react';

import { ErrorPage } from './components/pages/ErrorPage';

const App = lazy(() => import('./components/App/App.js'));

const HomePage = lazy(() => import('./components/pages/HomePage/HomePage.js'));
const CartPage = lazy(() => import('./components/pages/CartPage/CartPage.js'));

const SignUpPage = lazy(() => import('./components/pages/LoginPage/SignUpPage.js'));
const LoginPage = lazy(() => import('./components/pages/LoginPage/LoginPage.js'));

const ProductPage = lazy(() => import('./components/pages/ProductPage/ProductPage.js'));
const SearchPage = lazy(() => import('./components/pages/SearchPage/SearchPage.js'));

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
