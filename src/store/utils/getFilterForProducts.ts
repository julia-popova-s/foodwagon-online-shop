/* eslint-disable perfectionist/sort-objects */
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
  const filters = {
    currentPage: currentPage ? `?page=${currentPage}` : '?page=1',
    limit: limit ? `&limit=${limit}` : '&limit=4',
    category: category && category !== 'All' ? `&category=${category}` : '',
    id: id ? `&id=${id}` : '',
    orderType: sortType && orderType ? `&order=${orderType}` : '',
    rating: rating ? `&raiting=${rating}` : '',
    restaurantId: restaurantId ? `&restaurantId=${restaurantId}` : '',
    searchValue: searchValue ? `&search=${searchValue.replace(' ', '&')}` : '',
    sortType: sortType ? `&sortBy=${sortType}` : '',
  };
  
  return Object.values(filters).join('');
}
