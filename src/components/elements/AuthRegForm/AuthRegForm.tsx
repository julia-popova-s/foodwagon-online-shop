import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';
import { FC, MouseEvent, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import { HideButton } from '../../ui/buttons/HideButton';
import style from './authRegForm.module.scss';

type Data = {
  email: string;
  password: string;
};

type AuthRegFormProps = {
  errorMessage: string;
  handleClick: (email: string, password: string) => void;
  schema: yup.ObjectSchema<Data>;
  title: string;
};

const AuthRegForm: FC<AuthRegFormProps> = ({ errorMessage, handleClick, schema, title }) => {
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
  const [isHidden, setIsHidden] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = ({ email, password }: Data) => {
    handleClick(email, password);
    reset();
  };

  const handlePasswordVisibility = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsHidden(!isHidden);
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
              autoComplete="email"
            />
          )}
          control={control}
          name="email"
        />

        <div className={style.regForm__error} role="alert">
          {errors.email?.message}{' '}
        </div>

        <div className={style.regForm__hide}>
          <label className={style.regForm__label} htmlFor="password">
            Password
          </label>
          <HideButton handleClick={handlePasswordVisibility} isHidden={isHidden} />
        </div>

        <Controller
          render={({ field }) => {
            return (
              <input
                autoComplete="current-password"
                className={style.regForm__input}
                id="password"
                type={isHidden ? 'password' : 'text'}
                {...field}
                aria-invalid={errors.password ? 'true' : 'false'}
                ref={inputRef}
              />
            );
          }}
          control={control}
          name="password"
        />

        <div className={cn(style.regForm__error, style.regForm__error_theme)} role="alert">
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
