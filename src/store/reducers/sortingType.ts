import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootStore } from '..';

type SortType = 'discount' | 'name' | 'popular' | 'price' | 'rating' | 'time' | 'title';
type OrderType = 'asc' | 'desc';
interface SortingTypeSliceState {
  order: OrderType;
  sortType: SortType;
}
const initialState: SortingTypeSliceState = {
  order: 'desc',
  sortType: 'rating',
};

const sortingTypeSlice = createSlice({
  initialState,
  name: 'sortingType',
  reducers: {
    setSortType(state, action: PayloadAction<{ order: OrderType; type: SortType }>) {
      state.sortType = action.payload.type;
      state.order = action.payload.order;
    },
  },
});

export const orderSelector = (state: RootStore) => state.sortingType.order;
export const sortTypeSelector = (state: RootStore) => state.sortingType.sortType;

export const { setSortType } = sortingTypeSlice.actions;
export default sortingTypeSlice.reducer;
