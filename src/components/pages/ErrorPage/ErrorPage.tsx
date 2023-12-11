import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import style from './errorPage.module.scss';

export const ErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className={style.errorPage}>
        <div className={style.errorPage__container}>
          <h1 className={style.errorPage__text}>Sorry, an unexpected error occurred:</h1>

          <p className={style.errorPage__text}>
            <div>{error.status}</div>
            <div>{error.data?.message}</div>
          </p>
        </div>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className={style.errorPage}>
        <h1>Oops! Unexpected Error</h1>
        <p>Something went wrong.</p>
        <p>
          <i>{error.message}</i>
        </p>
      </div>
    );
  } else {
    return <>Oops</>;
  }
};
