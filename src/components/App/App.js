import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer, Header } from '../elements';
import Spinner from './Spinner.js';
import './styles/base.css';
import './styles/normalize.css';
import './styles/variables.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
