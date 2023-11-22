import { useState } from 'react';

import { ButtonDelivery } from '../../ui/buttons/ButtonDelivery';
import style from './delivery.module.scss';

const buttons = [
  { icon: '/images/find-food/delivery/delivery.svg', label: 'Delivery' },
  { icon: '/images/find-food/delivery/pickup.svg', label: 'Pickup' },
];

export function Delivery() {
  const [activeBtn, setActiveBtn] = useState(0);

  const handleSelectItem = (index) => {
    setActiveBtn(index);
  };
  return (
    <div className={style.delivery}>
      {buttons &&
        buttons.map(({ icon, label }, i) => (
          <ButtonDelivery
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
