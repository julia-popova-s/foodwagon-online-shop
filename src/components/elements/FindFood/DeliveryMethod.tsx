import { FC, useState } from 'react';

import { DeliveryTab } from '../../ui/buttons/DeliveryTab';
import style from './deliveryMethod.module.scss';

export type Button = {
  icon: string;
  label: DeliveryType;
};

export enum DeliveryType {
  DELIVERY = 'Delivery',
  PICKUP = 'Pickup',
}

type DeliveryMethodProps = { handleChangeDeliveryType: (index: number) => void; list: Button[] };

export const DeliveryMethod: FC<DeliveryMethodProps> = ({ handleChangeDeliveryType, list }) => {
  const [activeBtn, setActiveBtn] = useState(0);

  const handleSelectItem = (index: number) => {
    setActiveBtn(index);
    handleChangeDeliveryType(index);
  };

  return (
    <div className={style.delivery}>
      {list.map(({ icon, label }, i) => (
        <DeliveryTab
          active={activeBtn === i}
          handleClickItem={() => handleSelectItem(i)}
          icon={icon}
          key={`${label}_${i}`}
          label={label}
        />
      ))}
    </div>
  );
};
