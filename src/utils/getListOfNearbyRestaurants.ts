import { DistanceItem } from '../store/slices/location/types';
import { Restaurant } from '../store/utils/getExtraReducers';

export function getListOfNearbyRestaurants(sortingList?: DistanceItem[], originalList?: Restaurant[]) {
  return sortingList?.map((item) => originalList?.find((elem) => elem.id === item.id)).filter((el) => el !== undefined);
}
