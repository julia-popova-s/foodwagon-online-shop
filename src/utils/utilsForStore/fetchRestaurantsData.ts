import axios from 'axios';

import { CustomErrors, Restaurant } from './getExtraReducers';
import { FiltersForRestaurants, getFilterForRestaurants } from './getFilterForRestaurants';

export const fetchRestaurantsData = async function (params: FiltersForRestaurants, { rejectWithValue }: any) {
  const error = CustomErrors.ERROR_NOTHING_FOUND;

  const filter = getFilterForRestaurants(params);

  try {
    const { data } = await axios.get<Restaurant[]>(
      `https://647c7cd1c0bae2880ad0c1a4.mockapi.io/foodwagon/restaurants${filter}`,
    );

    if (data.length === 0) {
      return rejectWithValue(error);
    }
    return data;
  } catch (error: any) {
    return rejectWithValue('Error: ' + error?.message);
  }
};
