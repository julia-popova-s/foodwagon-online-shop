import { yupResolver } from '@hookform/resolvers/yup'
import cn from 'classnames'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { string } from 'yup'

import { regExpEmail } from '../../../utils/regExpEmail.js'
import style from './authRegForm.module.scss'

const schema = yup
  .object({
    email: string()
      .matches(regExpEmail, { excludeEmptyString: true, message: 'email is in incorrect format' })
      .required(),
    password: yup.string().required().min(8),
  })
  .required()

export function AuthRegForm({ handleClick, title }) {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })
  console.log(isValid)
  const onSubmit = ({ email, password }) => handleClick(email, password)

  return (
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
            {...field}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
        )}
        control={control}
        name="email"
      />

      <p className={style.regForm__error} role="alert">
        {errors.email?.message}{' '}
      </p>

      <label className={style.regForm__label} htmlFor="password">
        Password
      </label>
      <Controller
        render={({ field }) => (
          <input
            className={style.regForm__input}
            id="password"
            {...field}
            aria-invalid={errors.password ? 'true' : 'false'}
          />
        )}
        control={control}
        name="password"
      />

      <p className={style.regForm__error} role="alert">
        {errors.password?.message}
      </p>
      <input
        className={cn(style.regForm__button, {
          [style.regForm__isValid]: isValid,
        })}
        disabled={!isValid}
        type="submit"
        value={title}
      />
    </form>
  )
}
