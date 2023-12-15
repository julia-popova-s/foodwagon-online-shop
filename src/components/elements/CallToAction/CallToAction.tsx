import { FC } from 'react';
import { Link as LinkScroll } from 'react-scroll';

import { OrderButton } from '../../ui/buttons/OrderButton';
import style from './callToAction.module.scss';

const CallToAction: FC = () => {
  return (
    <div className={style.callToActionBlock}>
      <div className="container">
        <div className={style.callToAction}>
          <p className={style.callToAction__title}>Are you ready to order with the best deals?</p>

          <LinkScroll duration={500} offset={-70} smooth={true} spy={true} to="featuredRestaurants">
            <OrderButton classNames={style.callToAction__btn} name={'Proceed to order'} />
          </LinkScroll>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
