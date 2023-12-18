import * as yup from 'yup';

import { regExpEmail } from './regExpEmail';
import { regExpPassword } from './regExpPassword';

export const signupSchema = yup
  .object({
    email: yup
      .string()
      .matches(regExpEmail, {
        excludeEmptyString: true,
        message: 'email must be in a valid format',
      })
      .required(),
    password: yup
      .string()
      .matches(regExpPassword, {
        excludeEmptyString: true,
        message: 'password should consist of letters, numbers, and symbols',
      })
      .required()
      .min(8),
  })
  .required();

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .matches(regExpEmail, {
        excludeEmptyString: true,
        message: 'email must be in a valid format',
      })
      .required(),
    password: yup.string().required(),
  })
  .required();
