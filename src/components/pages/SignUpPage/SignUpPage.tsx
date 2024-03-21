import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { FC, Suspense, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../store';
import { setToken, setUser } from '../../../store/slices/user/slice';
import { AuthAPIErrors } from '../../../store/slices/user/types';
import { signupSchema } from '../../../utils/fieldValidationSchemes';
import { AuthRegForm } from '../../elements/AuthRegForm';
import Spinner from '../../ui/Spinner/Spinner';
import style from './signUpPage.module.scss';

export const SignUp: FC = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const auth = getAuth();
  const { pathname } = useLocation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegister = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
          }),
        );
        navigate('/');
        return user.getIdTokenResult();
      })
      .then(({ token }) => {
        dispatch(setToken(token));
      })
      .catch(({ code, message }) => {
        switch (code) {
          case AuthAPIErrors.EMAIL_ALREADY_EXISTS:
            setErrorMessage('This email address is already in use by another account.');
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
    <div className={style.signUp}>
      <Suspense fallback={<Spinner />}>
        <AuthRegForm errorMessage={errorMessage} handleClick={handleRegister} schema={signupSchema} title={'Sign Up'} />
      </Suspense>
    </div>
  );
};
