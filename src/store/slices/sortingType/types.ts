export enum RestaurantSortingType {
  DISCOUNT = 'discount',
  NAME = 'name',
  POPULAR = 'popular',
  RATING = 'rating',
}

export enum RestaurantOrderType {
  ASC = 'asc',
  DESC = 'desc',
}

export interface SortingTypeSliceState {
  category: number;
  orderType: RestaurantOrderType;
  sortType: RestaurantSortingType;
}
