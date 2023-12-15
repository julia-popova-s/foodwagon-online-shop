import { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import '../../styles/index.scss';
import { Footer } from '../elements/Footer';
import { Header } from '../elements/Header';
import Spinner from '../ui/Spinner/Spinner';

export const App: FC = () => {
  return (
    <div className="app">
      <Header />
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
};
