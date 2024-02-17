import { Status } from '../../utils/getExtraReducers';

export type Coords = [number, number];

export interface LocationItem {
  address: string;
  coords: Coords;
}

export interface LocationSliceState {
  error: null;
  isLoaded: false;
  list: LocationItem[];
  location: LocationItem;
  status: Status.LOADING;
}
