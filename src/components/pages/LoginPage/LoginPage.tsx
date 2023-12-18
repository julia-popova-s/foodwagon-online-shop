import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FC, Suspense, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../store';
import { setUser } from '../../../store/slices/user/slice';
import { loginSchema } from '../../../utils/fieldValidationSchemes';
import Spinner from '../../ui/Spinner/Spinner';
import AuthRegForm from './AuthRegForm';
import style from './loginPage.module.scss';

export const Login: FC = () => {
  const auth = getAuth();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
          }),
        );
        navigate('/');
      })
      .catch(({ code, message }) => {
        switch (code) {
          case 'auth/invalid-login-credentials':
            setErrorMessage('Invalid login details');
            break;

          default:
            setErrorMessage(message);
            break;
        }
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={style.login}>
      <Suspense fallback={<Spinner />}>
        <AuthRegForm errorMessage={errorMessage} handleClick={handleLogin} schema={loginSchema} title={'Log in'} />
      </Suspense>
    </div>
  );
};
