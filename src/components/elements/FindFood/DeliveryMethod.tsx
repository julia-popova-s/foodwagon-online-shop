import { FC } from 'react';
import { useSelector } from 'react-redux';

import { deliveryTypeSelector } from '../../../store/slices/location/slice';
import { DeliveryType } from '../../../store/slices/location/types';
import { DeliveryTab } from '../../ui/buttons/DeliveryTab';
import style from './deliveryMethod.module.scss';

export type Button = {
  icon: string;
  label: DeliveryType;
};

type DeliveryMethodProps = { handleChangeDeliveryType: (label: DeliveryType) => void; list: Button[] };

export const DeliveryMethod: FC<DeliveryMethodProps> = ({ handleChangeDeliveryType, list }) => {
  const deliveryType = useSelector(deliveryTypeSelector);

  const handleSelectItem = (label: DeliveryType) => {
    handleChangeDeliveryType(label);
  };

  return (
    <div className={style.delivery}>
      {list.map(({ icon, label }, i) => (
        <DeliveryTab
          active={deliveryType === label}
          handleClickItem={() => handleSelectItem(label)}
          icon={icon}
          key={`${label}_${i}`}
          label={label}
        />
      ))}
    </div>
  );
};
