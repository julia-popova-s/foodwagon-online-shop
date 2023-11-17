import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import Spinner from './components/App/Spinner.js';
import './firebase';
import { router } from './router';
import { persistor, store } from './store';

const browserRouter = createBrowserRouter(router, {
  basename: `${process.env.PUBLIC_URL}`,
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Suspense fallback={<Spinner />}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={browserRouter} />
      </PersistGate>
    </Provider>
  </Suspense>,
);
