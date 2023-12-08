import { FC } from 'react';

import style from './spinner.module.scss';

const Spinner: FC = () => {
  return (
    <div className={style.root}>
      <div className={style.loader}>
        <div className={style.dot}></div>
        <div className={style.dot}></div>
        <div className={style.dot}></div>
        <div className={style.dot}></div>
        <div className={style.dot}></div>
      </div>
    </div>
  );
};
export default Spinner;
