import { useRouteError } from 'react-router-dom'

import styles from './errorPage.module.scss'

export function ErrorPage() {
  const error = useRouteError()

  return (
    <div className={styles.errorPage}>
      <div className={styles.errorPage__container}>
        <p className={styles.errorPage__text}>Sorry, an unexpected error occurred:</p>
        <p className={styles.errorPage__text}>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  )
}
