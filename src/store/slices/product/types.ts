import { ErrorType, Product, Status } from '../../utils/getExtraReducers';

export interface ProductSliceState {
  error: ErrorType;
  isLoaded: boolean;
  list: Product[];
  status: Status;
}
