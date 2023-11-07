import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
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
      <label className={style.regForm__label}>
        Email address
        <Controller
          render={({ field }) => (
            <input {...field} aria-invalid={errors.email ? 'true' : 'false'} />
          )}
          className={style.regForm__input}
          control={control}
          name="email"
        />
      </label>
      <p className={style.regForm__error} role="alert">
        {errors.email?.message}{' '}
      </p>

      <label className={style.regForm__label}>
        Password
        <Controller
          render={({ field }) => (
            <input {...field} aria-invalid={errors.password ? 'true' : 'false'} />
          )}
          className={style.regForm__input}
          control={control}
          name="password"
        />
      </label>
      <p className={style.regForm__error} role="alert">
        {errors.password?.message}
      </p>
      <input className={style.regForm__button} type="submit" value={title} />
    </form>
  )
}
