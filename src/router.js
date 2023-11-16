import { Suspense, lazy } from 'react';

import Spinner from './components/App/Spinner.js';
import { ErrorPage } from './components/pages/ErrorPage';

const App = lazy(() => import('./components/App/App.js'));

const HomePage = lazy(() => import('./components/pages/Home/Home.js'));
const CartPage = lazy(() => import('./components/pages/Cart/Cart.js'));

const SignUpPage = lazy(() => import('./components/pages/Login/SignUp.js'));
const LoginPage = lazy(() => import('./components/pages/Login/Login.js'));

const Product = lazy(() => import('./components/pages/ProductPage/ProductPage.js'));
const Search = lazy(() => import('./components/pages/SearchPage/SearchPage.js'));

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
        element: <Product />,
        path: 'restaurant/:restaurantId/product/:id',
      },
      {
        element: <Search />,
        path: 'search',
      },
    ],
    element: <App />,
    errorElement: <ErrorPage />,
    path: '/',
  },
  {
    element: (
     
        <LoginPage />
   
    ),
    errorElement: <ErrorPage />,
    path: '/login',
  },
  {
    element: (
        <SignUpPage />
      
    ),
    errorElement: <ErrorPage />,
    path: '/register',
  },
];
