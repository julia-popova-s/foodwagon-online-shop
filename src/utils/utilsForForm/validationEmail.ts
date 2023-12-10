import { regExpEmail } from './regExpEmail.js.js';

export const validationEmail = function (email: string) {
  return regExpEmail.test(String(email).toLowerCase());
};
