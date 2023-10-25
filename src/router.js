import { App } from './components/App/App'
import { SearchPage } from './components/pages'
import { Cart, ErrorPage, Home, LoginForm } from './components/pages'
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
        element: <LoginForm />,
        path: 'login',
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
]
