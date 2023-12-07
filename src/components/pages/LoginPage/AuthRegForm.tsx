import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import style from './authRegForm.module.scss';

const AuthRegForm: FC = ({ errorMessage, handleClick, schema, title }) => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ email, password }) => {
    handleClick(email, password);
    reset();
  };

  return (
    <div className={style.formWrapper}>
      <form className={style.regForm} onSubmit={handleSubmit(onSubmit)}>
        <p className={style.regForm__title}>{title}</p>

        <p className={style.regForm__link}>
          Or{' '}
          <Link className={style.regForm__linkTo} to={title === 'Log in' ? '/register' : '/login'}>
            {title === 'Log in' ? 'Sign up' : 'Log in'}
          </Link>
        </p>

        <label className={style.regForm__label} htmlFor="email">
          Email address{' '}
        </label>

        <Controller
          render={({ field }) => (
            <input
              className={style.regForm__input}
              id="email"
              type="email"
              {...field}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
          )}
          control={control}
          name="email"
        />

        <div className={style.regForm__error} role="alert">
          {errors.email?.message}{' '}
        </div>

        <label className={style.regForm__label} htmlFor="password">
          Password
        </label>

        <Controller
          render={({ field }) => (
            <input
              className={style.regForm__input}
              id="password"
              type="password"
              {...field}
              aria-invalid={errors.password ? 'true' : 'false'}
            />
          )}
          control={control}
          name="password"
        />

        <div className={style.regForm__error} role="alert">
          {errors.password?.message}
        </div>

        <input
          className={cn(style.regForm__button, {
            [style.regForm__isValid]: isValid,
          })}
          disabled={!isValid}
          type="submit"
          value={title}
        />

        <div className={style.regForm__error} role="alert">
          {errorMessage && errorMessage}
        </div>
      </form>
    </div>
  );
};
export default AuthRegForm;
