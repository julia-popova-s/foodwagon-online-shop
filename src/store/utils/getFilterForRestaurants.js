export function getFilterForRestaurants(sortType, category, restaurantId, limit, page) {
  const idRequest = restaurantId ? `&id=${restaurantId}` : ''
  const sortRequest =
    sortType && sortType === 'rating'
      ? '&sortBy=weighted_rating_value&order=desc'
      : sortType === 'popular'
      ? '&sortBy=aggregated_rating_count&order=desc'
      : sortType === 'name'
      ? '&sortBy=name&order=asc'
      : sortType === 'time'
      ? '&sortBy=deliveryTime&order=asc'
      : ''

  const categoryRequest = category && category !== 'All' ? `&cuisines=${category}` : ''

  const limitRequest = limit ? `&limit=${limit}` : `&limit=8`

  const currentPage = page ? `&page=${page}` : `&page=1`

  return `${currentPage}${limitRequest}${sortRequest}${categoryRequest}${idRequest}`
}
