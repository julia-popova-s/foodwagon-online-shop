import { CafeAddress, ErrorType, Restaurant, Status } from '../../utils/getExtraReducers';

export interface RestaurantSliceState {
  error: ErrorType;
  isLoaded: boolean;
  list: Restaurant[];
  listOfOperatingStatus: OperatingStatusItem[];
  placemarks: PlacemarkType[];
  status: Status;
}

export interface OperatingStatusItem {
  address: CafeAddress;
  deliveryEnabled: string;
  id: string;
  name: string;
  pickupEnabled: string;
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
