import { ReactComponent as BoxSvg } from '../../../../assets/images/header/box.svg';
import style from './ordersLink.module.scss';

export const OrdersLink = () => {
  return (
    <div className={style.box}>
      <BoxSvg height={40} width={40} />
    </div>
  );
};
