import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { setUser } from '../../../store/reducers/user';
import { signupSchema } from '../../../utils/utilsForForm/fieldValidationSchemes';
import Spinner from '../../App/Spinner';
import AuthRegForm from './AuthRegForm';
import style from './login.module.scss';

function SignUp() {
  const [errorMessage, setErrorMessage] = useState('');

  const auth = getAuth();
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
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
}
export default SignUp;
