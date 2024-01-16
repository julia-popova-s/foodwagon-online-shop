/* eslint-disable perfectionist/sort-objects */
import { RestaurantOrderType, RestaurantSortingType } from '../slices/sortingType/types';

export interface FiltersForRestaurants {
  category?: string;
  currentPage?: number;
  limit?: number;
  orderType?: RestaurantOrderType;
  restaurantId?: string;
  sortType?: RestaurantSortingType;
}

export function getFilterForRestaurants({
  category,
  currentPage,
  limit,
  orderType,
  restaurantId,
  sortType,
}: FiltersForRestaurants) {
  const sortFilter =
    sortType === 'rating'
      ? '&sortBy=weighted_rating_value'
      : sortType === 'popular'
        ? '&sortBy=aggregated_rating_count'
        : sortType === 'name'
          ? '&sortBy=name'
          : sortType === 'discount'
            ? '&sortBy=discount'
            : '';

  const filters = {
    currentPage: currentPage ? `?page=${currentPage}` : '?page=1',
    limit: limit ? `&limit=${limit}` : '&limit=8',
    category: category && category !== 'All' ? `&cuisines=${category}` : '',
    orderType: sortType && orderType ? `&order=${orderType}` : '',
    restaurantId: restaurantId ? `&id=${restaurantId}` : '',
    sortType: sortFilter,
  };

  return Object.values(filters).join('');
}
