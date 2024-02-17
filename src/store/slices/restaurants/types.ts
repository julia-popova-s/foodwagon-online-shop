import { ErrorType, Restaurant, Status } from '../../utils/getExtraReducers';

export interface RestaurantSliceState {
  error: ErrorType;
  isLoaded: boolean;
  list: Restaurant[];
  placemarks: PlacemarkType[];
  status: Status;
}
export interface PlacemarkType {
  geometry: Geometry;
  id: string;
  properties: Properties;
  type: string;
}

export type Geometry = {
  coordinates: [number, number];
  type: string;
};

export type Properties = {
  balloonContent: string;
};
