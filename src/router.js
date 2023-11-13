import { App } from './components/App/App'
import { SearchPage } from './components/pages'
import { Cart, ErrorPage, Home, Login } from './components/pages'
import { SignUp } from './components/pages/Login/SignUp'
import { ProductPage } from './components/pages/ProductPage'

export const router = [
  {
    children: [
      {
        element: <Home />,
        path: '',
      },
      {
        element: <Cart />,
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
    ],
    element: <App />,
    errorElement: <ErrorPage />,
    path: '/',
  },
  { element: <Login />, errorElement: <ErrorPage />, path: '/login' },
  { element: <SignUp />, errorElement: <ErrorPage />, path: '/register' },
]
