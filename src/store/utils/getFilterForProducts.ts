import { ProductOrderType, ProductSortingType } from '../slices/filters/types';

export interface FiltersForProducts {
  category?: string;
  currentPage?: number;
  id?: string;
  limit?: number;
  orderType?: ProductOrderType;
  rating?: number;
  restaurantId?: string;
  searchValue?: string;
  sortType?: ProductSortingType;
}

export function getFilterForProducts({
  category,
  currentPage,
  id,
  limit,
  orderType,
  rating,
  restaurantId,
  searchValue,
  sortType,
}: FiltersForProducts): string {
  const currentPageFilter = currentPage ? `?page=${currentPage}` : '?page=1';

  const limitFilter = limit ? `&limit=${limit}` : '&limit=4';

  const sortFilter = sortType ? `&sortBy=${sortType}` : '';

  const orderFilter = sortType && orderType ? `&order=${orderType}` : '';

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
