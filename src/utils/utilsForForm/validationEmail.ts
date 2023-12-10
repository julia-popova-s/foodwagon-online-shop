import { regExpEmail } from './regExpEmail';

export const validationEmail = function (email: string) {
  return regExpEmail.test(String(email).toLowerCase());
};
