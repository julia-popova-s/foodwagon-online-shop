export enum ProductSortingType {
  DISCOUNT = 'discount',
  POPULAR = 'popular',
  PRICE = 'price',
  RATING = 'rating',
  TITLE = 'title',
}

export enum ProductOrderType {
  ASC = 'asc',
  DESC = 'desc',
}

export interface FilterSliceState {
  category: number;
  currentPage: number;
  orderType: ProductOrderType;
  searchBy: number;
  sortType: ProductSortingType;
}
