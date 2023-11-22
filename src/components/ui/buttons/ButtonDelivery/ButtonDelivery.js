import classNames from 'classnames';
import { ReactSVG } from 'react-svg';

import style from './buttonDelivery.module.scss';

export function ButtonDelivery({ active, icon, label, onClickItem }) {
  return (
    <button className={classNames(style.delivery, { [style.btnActive]: active })} onClick={onClickItem}>
      {label === 'Delivery' ? (
        <ReactSVG className={style.delivery___btnIcon} src={`${process.env.PUBLIC_URL}${icon}`} wrapper="span" />
      ) : (
        <ReactSVG className={style.delivery___btnIcon} src={`${process.env.PUBLIC_URL}${icon}`} wrapper="span" />
      )}

      <span className={style.delivery__btnName}>{label}</span>
    </button>
  );
}
