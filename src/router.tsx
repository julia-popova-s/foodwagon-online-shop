import { lazy } from 'react';

import { ErrorPage } from './components/pages/ErrorPage';
import OrderPage from './components/pages/OrderPage';

const App = lazy(() => import(/*webpackChunkName: "App"*/ './components/App'));
const HomePage = lazy(() => import(/*webpackChunkName: "HomePage"*/ './components/pages/HomePage'));
const CartPage = lazy(() => import(/*webpackChunkName: "CartPage"*/ './components/pages/CartPage'));
const SignUpPage = lazy(() => import(/*webpackChunkName: "SignUpPage"*/ './components/pages/SignUpPage'));
const LoginPage = lazy(() => import(/*webpackChunkName: "LoginPage"*/ './components/pages/LoginPage'));
const ProductPage = lazy(() => import(/*webpackChunkName: "ProductPage"*/ './components/pages/ProductPage'));
const SearchPage = lazy(() => import(/*webpackChunkName: "SearchPage"*/ './components/pages/SearchPage'));
const RestaurantPage = lazy(
  () => import(/*webpackChunkName: "RestaurantPage"*/ './components/blocks/FeaturedRestaurants'),
);

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
      { element: <RestaurantPage />, path: 'restaurant' },
      { element: <OrderPage />, path: 'orders' },
    ],
    element: <App />,
    errorElement: <ErrorPage />,
    path: '/',
  },
];
