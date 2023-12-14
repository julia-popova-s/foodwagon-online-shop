import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { FC, Suspense, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../store';
import { setUser } from '../../../store/reducers/user';
import { signupSchema } from '../../../utils/utilsForForm/fieldValidationSchemes';
import Spinner from '../../ui/Spinner/Spinner';
import AuthRegForm from './AuthRegForm';
import style from './loginPage.module.scss';

const SignUp: FC = () => {
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
      })
      .catch(({ code, message }) => {
        switch (code) {
          case 'auth/email-already-in-use':
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
    <div className={style.login}>
      <Suspense fallback={<Spinner />}>
        <AuthRegForm errorMessage={errorMessage} handleClick={handleRegister} schema={signupSchema} title={'Sign Up'} />
      </Suspense>
    </div>
  );
};
export default SignUp;
