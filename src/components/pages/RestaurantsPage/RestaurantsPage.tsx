import { FC } from 'react';

import { useScrollTo } from '../../../hooks/useScrollTo';
import FeaturedRestaurants from '../../blocks/FeaturedRestaurants';
import style from './restaurantsPage.module.scss';

export const RestaurantsPage: FC = () => {
  useScrollTo();

  return (
    <div className={style.restaurants}>
      <FeaturedRestaurants classNames={style.restaurants__list} title={'Restaurants Near Me'} />
    </div>
  );
};
