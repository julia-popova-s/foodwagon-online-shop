import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { FC, Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useScrollTo } from '../../../hooks/useScrollTo';
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

  useScrollTo();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegistration = (email: string, password: string) => {
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
          case AuthAPIErrors.EMAIL_ALREADY_IN_USE:
            setErrorMessage('This email address is already in use by another account.');
            break;

          default:
            setErrorMessage(message);
            break;
        }
      });
  };

  return (
    <div className={style.signUp}>
      <Suspense fallback={<Spinner />}>
        <AuthRegForm
          errorMessage={errorMessage}
          handleClick={handleRegistration}
          schema={signupSchema}
          title={'Sign Up'}
        />
      </Suspense>
    </div>
  );
};
