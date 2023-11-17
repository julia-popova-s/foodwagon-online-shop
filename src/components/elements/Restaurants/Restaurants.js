import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';

import { categorySelector, sortTypeSelector } from '../../../store/reducers/filters';
import { setCategory, setSortBy } from '../../../store/reducers/filters';
import { fetchRestaurants } from '../../../store/reducers/restaurants';
import { isLoadedSelector, restaurantListSelector } from '../../../store/reducers/restaurants';
import { Categories } from '../Categories';
import { SortPopup } from '../SortPopup';
import { RestaurantList } from './RestaurantList';
import style from './restaurants.module.scss';

const categoryNames = ['All', 'Pasta', 'Salad', 'Fish', 'Meat', 'Soup', 'Burger'];

const sortItems = [
  { name: 'popularity', type: 'popular' },
  { name: 'rating', type: 'rating' },
  { name: 'delivery time', type: 'time' },
  { name: 'alphabetically', type: 'name' },
];

export function Restaurants() {
  const [limit, setLimit] = useState(4);
  const dispatch = useDispatch();

  const category = useSelector(categorySelector);
  const sortType = useSelector(sortTypeSelector);

  const isLoaded = useSelector(isLoadedSelector);
  const list = useSelector(restaurantListSelector);

  const handleSelectCategory = (index) => {
    dispatch(setCategory(index));
  };

  const handleSelectSortType = (type) => {
    dispatch(setSortBy(type));
  };

  const handleLimit = () => {
    setLimit(false);
  };

  useEffect(() => {
    dispatch(
      fetchRestaurants({
        category: categoryNames[category],
        limit,
        sortType,
      })
    );
  }, [sortType, category, dispatch, limit]);

  return (
    <div className={style.restaurants} id="featuredRestaurants">
      <div className="container">
        <div className={style.restaurantList}>
          <h4 className={style.restaurantList__title}>Featured Restaurants</h4>
          <div className={style.restaurantList__filters}>
            <Categories
              activeCategory={category}
              handleClickCategory={handleSelectCategory}
              items={categoryNames}
            />
            <SortPopup
              activeSortType={sortType}
              handleClickSortType={handleSelectSortType}
              items={sortItems}
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
    </div>
  );
}
