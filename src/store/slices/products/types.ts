import { ProductSliceState } from '../product/types';

export interface ProductsSliceState extends ProductSliceState {
  currentPage: number;
}
