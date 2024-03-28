import { FC } from 'react';

import FeaturedRestaurants from '../../blocks/FeaturedRestaurants';
import style from './restaurantsPage.module.scss';

export const RestaurantsPage: FC = () => {
  return (
    <div className={style.restaurants}>
      <FeaturedRestaurants />
    </div>
  );
};
