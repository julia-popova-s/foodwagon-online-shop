import classNames from 'classnames';
import { FC } from 'react';
import { ReactSVG } from 'react-svg';

import style from './deliveryTab.module.scss';

type DeliveryTabProps = {
  active: boolean;
  handleClickItem: () => void;
  icon: string;
  label: string;
};

export const DeliveryTab: FC<DeliveryTabProps> = ({ active, handleClickItem, icon, label }) => {
  return (
    <button className={classNames(style.deliveryTab, { [style.deliveryTabActive]: active })} onClick={handleClickItem}>
      {label === 'Delivery' ? (
        <ReactSVG className={style.deliveryTab___btnIcon} src={`${process.env.PUBLIC_URL}${icon}`} wrapper="span" />
      ) : (
        <ReactSVG className={style.deliveryTab___btnIcon} src={`${process.env.PUBLIC_URL}${icon}`} wrapper="span" />
      )}

      <span className={style.deliveryTab__btnName}>{label}</span>
    </button>
  );
};
