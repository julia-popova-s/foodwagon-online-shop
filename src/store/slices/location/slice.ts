/* eslint-disable max-len */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootStore } from '../..';
import { getGeolocationCoordinates } from '../../../utils/getGeolocationCoordinates';
import { CustomErrors, MyAsyncThunkConfig, Status, getExtraReducers } from '../../utils/getExtraReducers';
import { LocationItem, LocationSliceState } from './types';

export const fetchData = async function ({ searchValue }: Params, { rejectWithValue }: any) {
  try {
    const { data } = await axios.get<Location[]>(
      `https://geocode-maps.yandex.ru/1.x?apikey=${process.env.REACT_APP_YANDEX_API_KEY}&geocode=${searchValue}&sco=longlat&format=json&lang=en_RU&results=5`,
    );

    if (data.length === 0) {
      return rejectWithValue(CustomErrors.ERROR_NOTHING_FOUND);
    }
    return getGeolocationCoordinates(data);
  } catch (error: any) {
    if (error.toJSON().status === 404) {
      return rejectWithValue(CustomErrors.ERROR_NOTHING_FOUND);
    }
    return rejectWithValue('Error: ' + error?.message);
  }
};

interface Params {
  searchValue: string;
}

export const fetchLocation = createAsyncThunk<LocationItem[], Params, MyAsyncThunkConfig>(
  'location/fetchLocation',
  fetchData,
);

const initialState: LocationSliceState = {
  error: null,
  isLoaded: false,
  list: [],
  location: {
    address: 'Saint Petersburg, Shpalernaya Street, 26',
    coords: [30.35151817345885, 59.94971367493227],
  },
  status: Status.LOADING,
};

const locationSlice = createSlice({
  extraReducers: (builder) => getExtraReducers(builder)(fetchLocation),

  initialState,
  name: 'location',

  reducers: {
    setLoaded(state, action) {
      state.isLoaded = action.payload;
    },
    setLocation(state, action) {
      state.location = action.payload;
    },
  },
});

export const locationListSelector = (state: RootStore) => state.location.list;
export const errorSelector = (state: RootStore) => state.location.error;
export const isLoadedSelector = (state: RootStore) => state.location.isLoaded;
export const statusSelector = (state: RootStore) => state.location.status;
export const addressSelector = (state: RootStore) => state.location.location.address;
export const coordsSelector = (state: RootStore) => state.location.location.coords;

export const { setLoaded, setLocation } = locationSlice.actions;
export default locationSlice.reducer;
