import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';

import { categorySelector, sortTypeSelector } from '../../../store/reducers/filters';
import { setCategory, setSortBy } from '../../../store/reducers/filters';
import { fetchRestaurants } from '../../../store/reducers/restaurants';
import { isLoadedSelector, restaurantListSelector } from '../../../store/reducers/restaurants';
import { Categories } from '../Categories';
import { SortPopup } from '../SortPopup';
import { SortItem, SortType } from '../SortPopup/SortPopup';
import { RestaurantList } from './RestaurantList';
import style from './featuredRestaurants.module.scss';

const categoryNames = ['All', 'Pasta', 'Salad', 'Fish', 'Meat', 'Soup', 'Burger'];

const sortItems: SortItem[] = [
  { name: 'popularity', type: 'popular' },
  { name: 'rating', type: 'rating' },
  { name: 'delivery time', type: 'time' },
  { name: 'alphabetically', type: 'name' },
];

export const FeaturedRestaurants: FC = () => {
  const [limit, setLimit] = useState<number>(4);
  const dispatch = useDispatch<any>();

  const category = useSelector(categorySelector);
  const sortType = useSelector(sortTypeSelector);

  const isLoaded = useSelector(isLoadedSelector);
  const list = useSelector(restaurantListSelector);

  const handleSelectCategory = (index: number) => {
    dispatch(setCategory(index));
  };

  const handleSelectSortType = (type: SortType) => {
    dispatch(setSortBy(type));
  };

  const handleLimit = () => {
    setLimit(0);
  };

  useEffect(() => {
    dispatch(
      fetchRestaurants({
        category: categoryNames[category],
        limit,
        sortType,
      }),
    );
  }, [sortType, category, dispatch, limit]);

  return (
    <section className={style.restaurants} id="featuredRestaurants">
      <div className="container">
        <div className={style.restaurantList}>
          <h4 className={style.restaurantList__title}>Featured Restaurants</h4>

          <div className={style.restaurantList__filters}>
            <Categories activeCategory={category} handleClickCategory={handleSelectCategory} items={categoryNames} />

            <SortPopup activeSortType={sortType} handleClickSortType={handleSelectSortType} items={sortItems} />
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
