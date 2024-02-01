import { ErrorType, Restaurant, Status } from '../../utils/getExtraReducers';

export interface RestaurantSliceState {
  error: ErrorType;
  isLoaded: boolean;
  list: Restaurant[];
  location: Location;
  placemarks: Placemark[];
  status: Status;
}
interface Placemark {
  geometry: Geometry;
  id: string;
  properties: Properties;
  type: string;
}

type Geometry = {
  coordinates: [number, number];
  type: string;
};

type Properties = {
  balloonContent: string;
};

type Location = {
  address: string;
  coords: [number, number];
};
