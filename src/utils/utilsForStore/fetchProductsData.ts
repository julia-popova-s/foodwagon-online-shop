import axios from 'axios';

import { CustomErrors, Product } from './getExtraReducers';
import { FiltersForProducts } from './getFilterForProducts';
import { getFilterForProducts } from './getFilterForProducts';

export const fetchProductsData = async function (params: FiltersForProducts, { rejectWithValue }: any) {
  if (params.searchValue === '') {
    return rejectWithValue(CustomErrors.ERROR_EMPTY_REQUEST);
  }

  const filter = getFilterForProducts(params);

  try {
    const { data } = await axios.get<Product[]>(
      `https://647c7cd1c0bae2880ad0c1a4.mockapi.io/foodwagon/products${filter}`,
    );

    if (data.length === 0) {
      return rejectWithValue(CustomErrors.ERROR_NOTHING_FOUND);
    }
    return data;
  } catch (error: any) {
    return rejectWithValue('Error: ' + error?.message);
  }
};
