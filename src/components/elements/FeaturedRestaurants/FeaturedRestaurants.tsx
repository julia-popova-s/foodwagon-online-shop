import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';

import { useAppDispatch } from '../../../store';
import { fetchRestaurants } from '../../../store/reducers/restaurants';
import { isLoadedSelector, restaurantListSelector } from '../../../store/reducers/restaurants';
import {
  CafeOrderType,
  CafeSortingType,
  categorySelector,
  orderTypeSelector,
  setCategory,
  setSortType,
  sortTypeSelector,
} from '../../../store/reducers/sortingType';
import { Categories } from '../Categories';
import { SortPopup } from '../SortPopup';
import { RestaurantList } from './RestaurantList';
import style from './featuredRestaurants.module.scss';

const categoryNames: string[] = ['All', 'Pasta', 'Salad', 'Fish', 'Meat', 'Soup', 'Burger'];

const sortItems = [
  { name: 'popularity', order: CafeOrderType.DESC, type: CafeSortingType.POPULAR },
  { name: 'rating', order: CafeOrderType.DESC, type: CafeSortingType.RATING },
  { name: 'delivery time', order: CafeOrderType.ASC, type: CafeSortingType.TIME },
  { name: 'alphabetically', order: CafeOrderType.ASC, type: CafeSortingType.NAME },
];

export const FeaturedRestaurants: FC = () => {
  const [limit, setLimit] = useState<number>(4);
  const dispatch = useAppDispatch();

  const category = useSelector(categorySelector);
  const sortType = useSelector(sortTypeSelector);
  const orderType = useSelector(orderTypeSelector);

  const isLoaded = useSelector(isLoadedSelector);
  const list = useSelector(restaurantListSelector);

  const handleSelectCategory = (index: number) => {
    dispatch(setCategory(index));
  };

  const handleSelectSortType = (sortType: any, orderType: any) => {
    dispatch(setSortType({ orderType, sortType }));
  };

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
            <Categories activeCategory={category} handleClickCategory={handleSelectCategory} items={categoryNames} />

            <SortPopup
              activeSortType={sortType}
              classNames={style.restaurantList__popup}
              handleClickSortType={handleSelectSortType}
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
