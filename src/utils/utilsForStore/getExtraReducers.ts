import type { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

type Cuisine = 'Dessert' | 'Fish' | 'Meat' | 'Pasta' | 'Salad';
interface Address {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  street_addr: string;
}
interface Restaurant {
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
interface Product {
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
  status: 'loading' | 'rejected' | 'resolve' | null;
}

type ListType = Product[] | Restaurant[];

export const getExtraReducers = (builder: ActionReducerMapBuilder<ProductSliceState>) => (fetch: any) => {
  builder
    .addCase(fetch.fulfilled, (state, action: PayloadAction<ListType>) => {
      state.status = 'resolve';
      state.list = action.payload;
      state.isLoaded = true;
      state.error = null;
    })
    .addCase(fetch.pending, (state) => {
      state.status = 'loading';
      state.isLoaded = false;
      state.list = [];
      state.error = null;
    })
    .addCase(fetch.rejected, (state, action: PayloadAction<Error>) => {
      state.status = 'rejected';
      state.isLoaded = false;
      state.list = [];
      state.error = action.payload;
    });
};
