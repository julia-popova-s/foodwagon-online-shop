import { ProductSliceState } from '../product/types';

export interface ProductSearchState extends ProductSliceState {
  currentPage: number;
  searchValue: string;
}
