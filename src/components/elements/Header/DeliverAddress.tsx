import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { FC } from 'react';

import style from './deliverAddress.module.scss';

type DeliverAddressProps = {
  address: string;
  classNames?: string;
};

export const DeliverAddress: FC<DeliverAddressProps> = ({ address, classNames }) => {
  console.log(address);
  return (
    <div className={cn(style.address, classNames)}>
      <p className={style.address__deliver}>Deliver to:</p>
      <FontAwesomeIcon className={style.address__icon} icon={faLocationDot} />
      <span className={style.address__location}>Current Location</span>
      <span className={cn(style.address__location, style.address__location_weight)}>{address}</span>
    </div>
  );
};
