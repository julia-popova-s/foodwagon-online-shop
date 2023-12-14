import type { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

export enum CustomErrors {
  ERROR_EMPTY_REQUEST = 'Are you ready to order with the best deals?',
  ERROR_NOTHING_FOUND = 'Nothing was found according to request.',
}
export interface MyAsyncThunkConfig {
  rejectValue: CustomErrors;
}

export enum Status {
  LOADING = 'loading',
  REJECT = 'reject',
  RESOLVE = 'resolve',
}

export type ErrorType = CustomErrors | Error | null;

interface Address {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  street_addr: string;
}
export interface Restaurant {
  address: Address;
  aggregated_rating_count: number;
  backgroundId: string;
  cuisines: string[];
  delivery_enabled: true;
  deliveryTime: number;
  id: string;
  imageSrc: string;
  is_open: boolean;
  logo_photos: string;
  minSumOrder: number;
  name: string;
  phone_number: string;
  pickup_enabled: boolean;
  weighted_rating_value: number;
}
export interface Product {
  category: string;
  discount: number;
  id: string;
  image: string;
  ingredients: string[];
  price: number;
  rating: number;
  restaurantId: string;
  restaurantName: string;
  title: string;
}

interface ProductSliceState {
  error: ErrorType;
  isLoaded: boolean;
  list: Product[] | Restaurant[];
  status: Status;
}

type ListType = Product[] | Restaurant[];

export const getExtraReducers = (builder: ActionReducerMapBuilder<ProductSliceState>) => (fetch: any) => {
  builder
    .addCase(fetch.fulfilled, (state, action: PayloadAction<ListType>) => {
      state.status = Status.RESOLVE;
      state.isLoaded = true;
      state.list = action.payload;
      state.error = null;
    })
    .addCase(fetch.pending, (state) => {
      state.status = Status.LOADING;
      state.isLoaded = false;
      state.list = [];
      state.error = null;
    })
    .addCase(fetch.rejected, (state, action: PayloadAction<ErrorType>) => {
      state.status = Status.REJECT;
      state.isLoaded = false;
      state.list = [];
      state.error = action.payload;
    });
};
