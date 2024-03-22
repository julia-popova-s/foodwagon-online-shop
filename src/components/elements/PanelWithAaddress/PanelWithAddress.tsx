import cn from 'classnames';
import { Link } from 'react-router-dom';

import { DeliveryStatus, DeliveryType } from '../../../store/slices/location/types';
import { OperatingStatusItem } from '../../../store/slices/restaurants/types';
import style from './panelWithAddress.module.scss';

type PanelWithAddressProps = {
  address: string;
  item?: OperatingStatusItem;
  status?: DeliveryStatus | null;
  type?: DeliveryType;
};

export const PanelWithAddress = ({ address, item, status, type }: PanelWithAddressProps) => {
  if (type === DeliveryType.DELIVERY) {
    if (status === DeliveryStatus.YES)
      return (
        <div className={style.address}>
          <p className={style.addressItem}>
            <span className={style.addressTitle}>Delivery status:</span> {status}
          </p>
          <p className={style.addressItem}>
            <span className={style.addressTitle}> Address:</span> {address}
          </p>
        </div>
      );
    if (status === null)
      return (
        <div className={cn(style.address, style.address_theme)}>
          <Link className={style.addressLink} to={'/'}>
            Please set your delivery address
          </Link>
        </div>
      );
    if (status === DeliveryStatus.NO)
      return (
        <div className={cn(style.address, style.address_theme)}>
          <Link className={style.addressLink} to={'/'}>
            Delivery to your address is not carried out...
          </Link>
        </div>
      );
  }

  if (type === DeliveryType.PICKUP) {
    if (item?.address)
      return (
        <div className={style.address}>
          <p className={style.addressItem}>
            <span className={style.addressTitle}>Address:</span> {item?.address.city}, {item?.address.street_addr},{' '}
            {item?.address.house}
          </p>{' '}
        </div>
      );
    if (!item?.address)
      return (
        <div className={cn(style.address, style.address_theme)}>
          <Link className={style.addressLink} to={'/'}>
            Refresh the page
          </Link>
        </div>
      );
  }

  return null;
};
