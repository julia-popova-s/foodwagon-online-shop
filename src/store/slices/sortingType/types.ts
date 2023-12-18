export enum RestaurantSortingType {
  NAME = 'name',
  POPULAR = 'popular',
  RATING = 'rating',
  TIME = 'time',
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
