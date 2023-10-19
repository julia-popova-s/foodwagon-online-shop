export function getFilterForProducts(sortType, category, restaurantId, limit, page, order) {
  const sortRequest = sortType ? `&sortBy=${sortType}` : ''
  const orderRequest = sortType && order ? `&order=${order}` : ''

  const categoryRequest = category && category !== 'All' ? `&category=${category}` : ''

  const idRequest = restaurantId ? `&restaurantId=${restaurantId}` : ''

  const limitRequest = limit ? `&limit=${limit}` : `&limit=8`

  const currentPage = page ? `&page=${page}` : `&page=1`

  return `${currentPage}${limitRequest}${sortRequest}${orderRequest}${categoryRequest}${idRequest}`
}
