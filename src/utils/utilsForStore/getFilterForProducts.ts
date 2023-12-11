type SortType = 'discount' | 'name' | 'popular' | 'price' | 'rating' | 'time' | 'title';
type OrderType = 'asc' | 'desc';
export interface FiltersForProducts {
  category?: string;
  currentPage?: number;
  id?: string;
  limit?: number;
  order?: OrderType;
  rating?: number;
  restaurantId?: string;
  searchValue?: string;
  sortType?: SortType;
}
export function getFilterForProducts({
  category,
  currentPage,
  id,
  limit,
  order,
  rating,
  restaurantId,
  searchValue,
  sortType,
}: FiltersForProducts): string {
  const currentPageFilter = currentPage ? `?page=${currentPage}` : '?page=1';

  const limitFilter = limit ? `&limit=${limit}` : '&limit=4';

  const sortFilter = sortType ? `&sortBy=${sortType}` : '';

  const orderFilter = sortType && order ? `&order=${order}` : '';

  const categoryFilter = category && category !== 'All' ? `&category=${category}` : '';

  const idFilter = restaurantId ? `&restaurantId=${restaurantId}` : '';

  const searchState = searchValue ? `&search=${searchValue.replace(' ', '&')}` : '';

  const idProductFilter = id ? `&id=${id}` : '';

  const ratingFilter = rating ? `&raiting=${rating}` : '';

  return (
    `${currentPageFilter}${limitFilter}${sortFilter}${orderFilter}${categoryFilter}` +
    `${idFilter}${searchState}${idProductFilter}${ratingFilter}`
  );
}
