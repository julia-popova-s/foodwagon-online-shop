import { FC } from 'react';
import { useRouteError } from 'react-router-dom';

import style from './errorPage.module.scss';

export const ErrorPage: FC = () => {
  const error = useRouteError();

  return (
    <div className={style.errorPage}>
      <div className={style.errorPage__container}>
        <p className={style.errorPage__text}>Sorry, an unexpected error occurred:</p>

        <p className={style.errorPage__text}>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
};
