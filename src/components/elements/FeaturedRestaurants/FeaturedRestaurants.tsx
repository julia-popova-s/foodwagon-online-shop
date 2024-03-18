import { FC, useCallback, useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';

import { ReactComponent as ButtonLeft } from '../../../assets/images/food/btn_left.svg';
import { useAppDispatch, useAppSelector } from '../../../store';
import {
  fetchRestaurants,
  isLoadedSelector,
  restaurantListSelector,
  setPlacemarks,
} from '../../../store/slices/restaurants/slice';
import {
  categorySelector,
  orderTypeSelector,
  setCategory,
  setSortType,
  sortTypeSelector,
} from '../../../store/slices/sortingType/slice';
import { RestaurantOrderType, RestaurantSortingType } from '../../../store/slices/sortingType/types';
import { Categories } from '../Categories';
import { SortPopup } from '../SortPopup';
import { RestaurantList } from './RestaurantList';
import style from './featuredRestaurants.module.scss';

const categoryNames: string[] = ['All', 'Pasta', 'Salad', 'Fish', 'Meat', 'Soup', 'Burger'];

const sortItems = [
  { name: 'popularity', order: RestaurantOrderType.DESC, type: RestaurantSortingType.POPULAR },
  { name: 'rating', order: RestaurantOrderType.DESC, type: RestaurantSortingType.RATING },
  { name: 'discount', order: RestaurantOrderType.DESC, type: RestaurantSortingType.DISCOUNT },
  { name: 'alphabetically', order: RestaurantOrderType.ASC, type: RestaurantSortingType.NAME },
];

export const FeaturedRestaurants: FC = () => {
  const [limit, setLimit] = useState<number>(10);

  const dispatch = useAppDispatch();

  const category = useAppSelector(categorySelector);
  const sortType = useAppSelector(sortTypeSelector);
  const orderType = useAppSelector(orderTypeSelector);

  const isLoaded = useAppSelector(isLoadedSelector);
  const list = useAppSelector(restaurantListSelector);

  const handleChangeCategory = useCallback((index: number) => {
    dispatch(setCategory(index));
  }, []);

  const handleChangeSortType = useCallback((sortType: any, orderType: any) => {
    dispatch(setSortType({ orderType, sortType }));
  }, []);

  const handleLimitChange = () => {
    setLimit(limit + 10);
  };

  useEffect(() => {
    dispatch(
      fetchRestaurants({
        category: categoryNames[category],
        limit,
        orderType,
        sortType,
      }),
    );
  }, [sortType, category, limit, orderType]);

  useEffect(() => {
    if (isLoaded) {
      dispatch(setPlacemarks());
    }
  }, [isLoaded]);

  return (
    <section className={style.restaurants} id="featuredRestaurants">
      <div className="container">
        <div className={style.restaurantList}>
          <h4 className={style.restaurantList__title}>Featured Restaurants</h4>

          <div className={style.restaurantList__filters}>
            <Categories activeCategory={category} handleChangeCategory={handleChangeCategory} items={categoryNames} />

            <SortPopup
              activeSortType={sortType}
              classNames={style.restaurantList__popup}
              handleChangeSortType={handleChangeSortType}
              items={sortItems}
              orderType={orderType}
            />
          </div>

          <RestaurantList isLoading={isLoaded} list={list} />

          <button className={style.restaurantList__btn} onClick={handleLimitChange}>
            <span className={style.restaurantList__btnName}>View All</span>
            <ButtonLeft className={style.restaurantList__btnIcon} />
          </button>
        </div>
      </div>
    </section>
  );
};
