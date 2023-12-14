type SortType = 'discount' | 'name' | 'popular' | 'price' | 'rating' | 'time' | 'title';
type OrderType = 'asc' | 'desc';

export interface FiltersForRestaurants {
  category?: string;
  currentPage?: number;
  limit?: number;
  orderType?: OrderType;
  restaurantId?: string;
  sortType?: SortType;
}

export function getFilterForRestaurants({
  category,
  currentPage,
  limit,
  orderType,
  restaurantId,
  sortType,
}: FiltersForRestaurants) {
  const pageFilter = currentPage ? `?page=${currentPage}` : '?page=1';

  const limitFilter = limit ? `&limit=${limit}` : '&limit=8';

  const sortFilter =
    sortType === 'rating'
      ? '&sortBy=weighted_rating_value'
      : sortType === 'popular'
        ? '&sortBy=aggregated_rating_count'
        : sortType === 'name'
          ? '&sortBy=name'
          : sortType === 'time'
            ? '&sortBy=deliveryTime'
            : '';

  const orderFilter = sortType && orderType ? `&order=${orderType}` : '';

  const categoryFilter = category && category !== 'All' ? `&cuisines=${category}` : '';

  const idFilter = restaurantId ? `&id=${restaurantId}` : '';

  return `${pageFilter}${limitFilter}${sortFilter}${orderFilter}${categoryFilter}${idFilter}`;
}
