export function getFilterForProducts({ category, currentPage, id, limit, order, restaurantId, searchValue, sortType }) {
  const currentPageFilter = currentPage ? `?page=${currentPage}` : '?page=1';

  const limitFilter = limit ? `&limit=${limit}` : '&limit=4';

  const sortFilter = sortType ? `&sortBy=${sortType}` : '';

  const orderFilter = sortType && order ? `&order=${order}` : '';

  const categoryFilter = category && category !== 'All' ? `&category=${category}` : '';

  const idFilter = restaurantId ? `&restaurantId=${restaurantId}` : '';

  const searchState = searchValue ? `&search=${searchValue.replace(' ', '&')}` : '';

  const idProductFilter = id ? `&id=${id}` : '';

  return `${currentPageFilter}${limitFilter}${sortFilter}${orderFilter}${categoryFilter}${idFilter}${searchState}${idProductFilter}`;
}
