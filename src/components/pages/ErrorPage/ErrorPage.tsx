import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import style from './errorPage.module.scss';

export const ErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className={style.errorPage}>
        <div className={style.errorPage__container}>
          <h1 className={style.errorPage__title}>Sorry, an unexpected error occurred:</h1>

          <p className={style.errorPage__text}>
            <div className={style.errorPage__text}>{error.status}</div>
            <div className={style.errorPage__text}>{error.data}</div>
          </p>
        </div>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className={style.errorPage}>
        <div className={style.errorPage__container}>
          <h1 className={style.errorPage__title}>Oops! Unexpected Error</h1>
          <p className={style.errorPage__text}>Something went wrong.</p>
          <div className={style.errorPage__text}>{error.message}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={style.errorPage}>
        <div className={style.errorPage__container}>
          <h1 className={style.errorPage__title}>Oops! Unexpected Error</h1>
          <p className={style.errorPage__text}>Something went wrong.</p>
        </div>
      </div>
    );
  }
};
