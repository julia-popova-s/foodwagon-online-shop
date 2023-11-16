// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { Suspense } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

// import { isAuthSelector } from '../../store/reducers/user';
import { Footer, Header } from '../elements';
import Spinner from './Spinner.js';
import './styles/base.css';
import './styles/normalize.css';

function App() {
  // const navigate = useNavigate();
  // const isAuth = useSelector(isAuthSelector);

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate('/login');
  //   }
  // }, [isAuth]);

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
