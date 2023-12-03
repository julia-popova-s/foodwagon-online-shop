import { useState } from 'react';

import { DeliveryTab } from '../../ui/buttons/DeliveryTab';
import style from './deliveryMethod.module.scss';

const buttons = [
  { icon: '/images/find-food/delivery/delivery.svg', label: 'Delivery' },
  { icon: '/images/find-food/delivery/pickup.svg', label: 'Pickup' },
];

export function DeliveryMethod() {
  const [activeBtn, setActiveBtn] = useState(0);

  const handleSelectItem = (index) => {
    setActiveBtn(index);
  };
  return (
    <div className={style.delivery}>
      {buttons &&
        buttons.map(({ icon, label }, i) => (
          <DeliveryTab
            active={activeBtn === i}
            icon={icon}
            key={`${label}_${i}`}
            label={label}
            onClickItem={() => handleSelectItem(i)}
          />
        ))}
    </div>
  );
}