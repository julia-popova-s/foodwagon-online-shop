import { FC, useState } from 'react';

import { DeliveryTab } from '../../ui/buttons/DeliveryTab';
import style from './deliveryMethod.module.scss';

export type Button = {
  icon: string;
  label: 'Delivery' | 'Pickup';
};

type DeliveryMethodProps = { list: Button[] };

export const DeliveryMethod: FC<DeliveryMethodProps> = ({ list }) => {
  const [activeBtn, setActiveBtn] = useState(0);

  const handleSelectItem = (index: number) => {
    setActiveBtn(index);
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
