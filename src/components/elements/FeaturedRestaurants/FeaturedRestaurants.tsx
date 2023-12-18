import { FC, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';

import { useAppDispatch } from '../../../store';
import { isLoadedSelector, restaurantListSelector } from '../../../store/slices/restaurants/selectors';
import { fetchRestaurants } from '../../../store/slices/restaurants/slice';
import { categorySelector, orderTypeSelector, sortTypeSelector } from '../../../store/slices/sortingType/selectors';
import { setCategory, setSortType } from '../../../store/slices/sortingType/slice';
import { RestaurantOrderType, RestaurantSortingType } from '../../../store/slices/sortingType/types';
import { Categories } from '../Categories';
import { SortPopup } from '../SortPopup';
import { RestaurantList } from './RestaurantList';
import style from './featuredRestaurants.module.scss';

const categoryNames: string[] = ['All', 'Pasta', 'Salad', 'Fish', 'Meat', 'Soup', 'Burger'];

const sortItems = [
  { name: 'popularity', order: RestaurantOrderType.DESC, type: RestaurantSortingType.POPULAR },
  { name: 'rating', order: RestaurantOrderType.DESC, type: RestaurantSortingType.RATING },
  { name: 'delivery time', order: RestaurantOrderType.ASC, type: RestaurantSortingType.TIME },
  { name: 'alphabetically', order: RestaurantOrderType.ASC, type: RestaurantSortingType.NAME },
];

export const FeaturedRestaurants: FC = () => {
  const [limit, setLimit] = useState<number>(4);
  const dispatch = useAppDispatch();

  const category = useSelector(categorySelector);
  const sortType = useSelector(sortTypeSelector);
  const orderType = useSelector(orderTypeSelector);

  const isLoaded = useSelector(isLoadedSelector);
  const list = useSelector(restaurantListSelector);

  const handleChangeCategory = useCallback((index: number) => {
    dispatch(setCategory(index));
  }, []);

  const handleChangeSortType = useCallback((sortType: any, orderType: any) => {
    dispatch(setSortType({ orderType, sortType }));
  }, []);

  const handleLimit = () => {
    setLimit(limit * 2);
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

          <button className={style.restaurantList__btn} onClick={handleLimit}>
            View All
            <ReactSVG
              className={style.restaurantList__btnLeft}
              src={process.env.PUBLIC_URL + '/images/food/btn_left.svg'}
              wrapper="span"
            />
          </button>
        </div>
      </div>
    </section>
  );
};
