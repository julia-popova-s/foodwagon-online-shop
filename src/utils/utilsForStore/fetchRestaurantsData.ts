import { Restaurant } from './getExtraReducers';
import { FiltersForRestaurants, getFilterForRestaurants } from './getFilterForRestaurants';

export const fetchRestaurantsData = async function (params: FiltersForRestaurants, { rejectWithValue }: any) {
  const filter = getFilterForRestaurants(params);

  try {
    const response = await fetch(`https://647c7cd1c0bae2880ad0c1a4.mockapi.io/foodwagon/restaurants${filter}`);
    if (!response.ok) {
      return rejectWithValue(response.status);
    }
    return (await response.json()) as Restaurant[];
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
};
