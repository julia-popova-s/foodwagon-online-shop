import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import App from './components/App/App'
import { Cart, ErrorPage, Home, LoginForm } from './components/pages'
import { ProductPage } from './components/pages/ProductPage'
import { RestaurantPage } from './components/pages/RestaurantPage'
import { persistor, store } from './store'

const router = createBrowserRouter(
  [
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
        // {
        //   path: 'restaurant/:restaurantId',
        //   element: <RestaurantPage />,
        // },
        {
          element: <ProductPage />,
          path: 'restaurant/:restaurantId/product/:id',
        },
      ],
      element: <App />,
      errorElement: <ErrorPage />,
      path: '/',
    },
  ],
  {
    basename: `${process.env.PUBLIC_URL}`,
  }
)

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
)
