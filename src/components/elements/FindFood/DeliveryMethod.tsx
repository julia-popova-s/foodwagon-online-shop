import { FC, useState } from 'react';

import { DeliveryTab } from '../../ui/buttons/DeliveryTab';
import style from './deliveryMethod.module.scss';

type Button = {
  icon: string;
  label: 'Delivery' | 'Pickup';
};

const buttons: Button[] = [
  { icon: '/images/find-food/delivery/delivery.svg', label: 'Delivery' },
  { icon: '/images/find-food/delivery/pickup.svg', label: 'Pickup' },
];

export const DeliveryMethod: FC = () => {
  const [activeBtn, setActiveBtn] = useState(0);

  const handleSelectItem = (index: number) => {
    setActiveBtn(index);
  };
  return (
    <div className={style.delivery}>
      {buttons &&
        buttons.map(({ icon, label }, i) => (
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
