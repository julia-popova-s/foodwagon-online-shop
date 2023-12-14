import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootStore } from '..';
import { fetchRestaurantsData } from '../../utils/utilsForStore/fetchRestaurantsData';
import {
  ErrorType,
  MyAsyncThunkConfig,
  Restaurant,
  Status,
  getExtraReducers,
} from '../../utils/utilsForStore/getExtraReducers';
import { FiltersForRestaurants } from '../../utils/utilsForStore/getFilterForRestaurants';

export interface RestSliceState {
  error: ErrorType;
  isLoaded: boolean;
  list: Restaurant[];
  status: Status;
}

export const fetchRestaurants = createAsyncThunk<Restaurant[], FiltersForRestaurants, MyAsyncThunkConfig>(
  'products/fetchRestaurants',
  fetchRestaurantsData,
);

const initialState: RestSliceState = {
  error: null,
  isLoaded: false,
  list: [],
  status: Status.LOADING,
};

const restSlice = createSlice({
  extraReducers: (builder) => getExtraReducers(builder)(fetchRestaurants),

  initialState,
  name: 'restaurants',

  reducers: {
    setLoaded(state, action: PayloadAction<boolean>) {
      state.isLoaded = action.payload;
    },
  },
});

export const restaurantListSelector = (state: RootStore) => state.restaurants.list;
export const errorSelector = (state: RootStore) => state.restaurants.error;
export const isLoadedSelector = (state: RootStore) => state.restaurants.isLoaded;
export const statusSelector = (state: RootStore) => state.restaurants.status;

export const { setLoaded } = restSlice.actions;
export default restSlice.reducer;
