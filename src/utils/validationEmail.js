import { regExpEmail } from './regExpEmail.js.js'

export const validationEmail = function (email) {
  return regExpEmail.test(String(email).toLowerCase())
}
