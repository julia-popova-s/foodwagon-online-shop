type SortType = 'discount' | 'name' | 'popular' | 'price' | 'rating' | 'time' | 'title';
export interface Filters {
  category: string;
  currentPage: number;
  limit: number;
  restaurantId: string;
  sortType: SortType;
}

export function getFilterForRestaurants({ category, currentPage, limit, restaurantId, sortType }: Filters) {
  const page = currentPage ? `?page=${currentPage}` : '?page=1';

  const limitFilter = limit ? `&limit=${limit}` : '&limit=8';

  const sortFilter =
    sortType && sortType === 'rating'
      ? '&sortBy=weighted_rating_value&order=desc'
      : sortType === 'popular'
        ? '&sortBy=aggregated_rating_count&order=desc'
        : sortType === 'name'
          ? '&sortBy=name&order=asc'
          : sortType === 'time'
            ? '&sortBy=deliveryTime&order=asc'
            : '';

  const categoryFilter = category && category !== 'All' ? `&cuisines=${category}` : '';

  const idFilter = restaurantId ? `&id=${restaurantId}` : '';

  return `${page}${limitFilter}${sortFilter}${categoryFilter}${idFilter}`;
}
