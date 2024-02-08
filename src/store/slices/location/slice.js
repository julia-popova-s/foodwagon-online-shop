import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// import { RootStore } from '../..';
import { getBalloon } from '../../../utils/getBalloon';
import { getGeolocationCoordinates } from '../../../utils/getGeolocationCoordinates';
// import { fetchRestaurantsData } from '../../utils/fetchRestaurantsData';
import { CustomErrors, MyAsyncThunkConfig, Restaurant, Status, getExtraReducers } from '../../utils/getExtraReducers';
// import { FiltersForRestaurants } from '../../utils/getFilterForRestaurants';
// import { RestaurantSliceState } from './types';

export const fetchData = async function ({ searchValue }, { rejectWithValue }) {
  try {
    const { data } = await axios.get(
      `https://geocode-maps.yandex.ru/1.x?apikey=${process.env.REACT_APP_YANDEX_API_KEY}&geocode=${searchValue}&format=json&lang=en_RU&results=5`,
    );

    if (data.length === 0) {
      return rejectWithValue(CustomErrors.ERROR_NOTHING_FOUND);
    }

    return getGeolocationCoordinates(data);
  } catch (error) {
    if (error.toJSON().status === 404) {
      return rejectWithValue(CustomErrors.ERROR_NOTHING_FOUND);
    }
    return rejectWithValue('Error: ' + error?.message);
  }
};
export const fetchLocation = createAsyncThunk('location/fetchLocation', fetchData);

const initialState = {
  error: null,
  isLoaded: false,
  list: [],
  location: {
    address: 'Saint Petersburg, Shpalernaya Street, 26',
    coords: [59.94971367493227, 30.35151817345885],
  },
  placemarks: [],
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
    setPlacemarks(state) {
      state.placemarks = state.list.map((item) => {
        const {
          address: { city, latitude, longitude, street_addr },
          backgroundId,
          id,
          logo_photos,
          name,
          phone_number,
        } = item;

        return {
          geometry: {
            coordinates: [latitude, longitude],
            type: 'Point',
          },
          id,
          properties: {
            balloonContent: getBalloon(
              id,
              name,
              logo_photos,
              phone_number,
              street_addr,
              latitude,
              longitude,
              backgroundId,
              city,
            ),
          },
          type: 'Feature',
        };
      });
    },
  },
});

export const locationListSelector = (state) => state.location.list;
export const errorSelector = (state) => state.location.error;
export const isLoadedSelector = (state) => state.location.isLoaded;
export const statusSelector = (state) => state.location.status;
export const placemarkSelector = (state) => state.location.placemarks;
export const addressSelector = (state) => state.location.location.address;
export const coordsSelector = (state) => state.location.location.coords;

export const { setLoaded, setLocation, setPlacemarks } = locationSlice.actions;
export default locationSlice.reducer;
