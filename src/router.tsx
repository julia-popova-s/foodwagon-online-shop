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
const RestaurantsPage = lazy(() => import(/*webpackChunkName: "RestaurantPage"*/ './components/pages/RestaurantsPage'));

export enum RouteNames {
  CART = '/cart',
  HOME = '/',
  LOGIN = '/login',
  NOTFOUNDPAGE = '*',
  ORDERS = '/orders',
  PRODUCT = '/restaurant/:restaurantId/product/:id',
  RESTAURANTS = '/restaurants',
  SEARCH = '/search',
  SIGNUP = '/register',
}

export const router = [
  {
    children: [
      {
        element: <HomePage />,
        path: RouteNames.HOME,
      },
      {
        element: <CartPage />,
        path: RouteNames.CART,
      },

      {
        element: <ProductPage />,
        path: RouteNames.PRODUCT,
      },
      {
        element: <SearchPage />,
        path: RouteNames.SEARCH,
      },
      {
        element: <LoginPage />,
        path: RouteNames.LOGIN,
      },
      {
        element: <SignUpPage />,
        path: RouteNames.SIGNUP,
      },
      {
        element: <RestaurantsPage />,
        path: RouteNames.RESTAURANTS,
      },
      {
        element: <OrderPage />,
        path: RouteNames.ORDERS,
      },
    ],
    element: <App />,
    errorElement: <ErrorPage />,
  },
];
