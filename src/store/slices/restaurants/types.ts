import { ErrorType, Restaurant, Status } from '../../utils/getExtraReducers';

export interface RestaurantSliceState {
  error: ErrorType;
  isLoaded: boolean;
  list: Restaurant[];
  status: Status;
}
