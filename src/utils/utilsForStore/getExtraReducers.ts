import type { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

type Cuisine = 'Dessert' | 'Fish' | 'Meat' | 'Pasta' | 'Salad';
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
  cuisines: Cuisine[];
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
  error: Error | null;
  isLoaded: boolean;
  list: Product[] | Restaurant[];
  status: Status;
}

type ListType = Product[] | Restaurant[];

enum Status {
  LOADING = 'loading',
  REJECT = 'reject',
  RESOLVE = 'resolve',
}

export const getExtraReducers = (builder: ActionReducerMapBuilder<ProductSliceState>) => (fetch: any) => {
  builder
    .addCase(fetch.fulfilled, (state, action: PayloadAction<ListType>) => {
      state.status = Status.RESOLVE;
      state.list = action.payload;
      state.isLoaded = true;
      state.error = null;
    })
    .addCase(fetch.pending, (state) => {
      state.status = Status.LOADING;
      state.isLoaded = false;
      state.list = [];
      state.error = null;
    })
    .addCase(fetch.rejected, (state, action: PayloadAction<Error>) => {
      state.status = Status.REJECT;
      state.isLoaded = false;
      state.list = [];
      state.error = action.payload;
    });
};
