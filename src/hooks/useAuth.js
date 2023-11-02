import { useSelector } from 'react-redux'

import { emailSelector, idSelector, tokenSelector } from '../store/reducers/user'

export const useAuth = () => {
  const email = useSelector(emailSelector)
  const token = useSelector(tokenSelector)
  const id = useSelector(idSelector)

  return {
    email,
    id,
    isAuth: !!email,
    token,
  }
}
