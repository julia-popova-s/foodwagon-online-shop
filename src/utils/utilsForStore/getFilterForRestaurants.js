export function getFilterForRestaurants({ category, limit, page, restaurantId, sortType }) {
  const currentPage = page ? `?page=${page}` : '?page=1';
  
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

  return `${currentPage}${limitFilter}${sortFilter}${categoryFilter}${idFilter}`;
}
