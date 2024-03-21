import classNames from 'classnames';
import { FC } from 'react';

import { ReactComponent as Delivery } from '../../../../assets/images/delivery/delivery.svg';
import { ReactComponent as Pickup } from '../../../../assets/images/delivery/pickup.svg';
import style from './deliveryTab.module.scss';

type DeliveryTabProps = {
  active: boolean;
  handleClickItem: () => void;
  label: string;
};
export const DeliveryTab: FC<DeliveryTabProps> = ({ active, handleClickItem, label }) => {
  return (
    <button className={classNames(style.deliveryTab, { [style.deliveryTab_active]: active })} onClick={handleClickItem}>
      {label === 'Delivery' ? (
        <Delivery className={style.deliveryTab__btnIcon} />
      ) : (
        <Pickup className={style.deliveryTab__btnIcon} />
      )}

      <span className={style.deliveryTab__btnName}>{label}</span>
    </button>
  );
};
