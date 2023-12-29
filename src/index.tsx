import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import Spinner from './components/ui/Spinner/Spinner';
import './firebase';
import { router } from './router';
import { persistor, store } from './store';

const hashRouter = createHashRouter(router, {
  basename: '/',
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Suspense fallback={<Spinner />}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={hashRouter} />
      </PersistGate>
    </Provider>
  </Suspense>,
);
