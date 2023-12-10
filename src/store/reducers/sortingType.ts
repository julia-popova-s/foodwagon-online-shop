import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootStore } from '..';

type SortType = 'discount' | 'name' | 'popular' | 'price' | 'rating' | 'time' | 'title';
type OrderType = 'asc' | 'desc';
interface PayloadActionProps {
  order: OrderType;
  type: SortType;
}

const sortingTypeSlice = createSlice({
  initialState: {
    order: 'desc',
    sortType: 'rating',
  },
  name: 'sortingType',
  reducers: {
    setSortType(state, action: PayloadAction<PayloadActionProps>) {
      state.sortType = action.payload.type;
      state.order = action.payload.order;
    },
  },
});

export const orderSelector = (state: RootStore) => state.sortingType.order;
export const sortTypeSelector = (state: RootStore) => state.sortingType.sortType;

export const { setSortType } = sortingTypeSlice.actions;
export default sortingTypeSlice.reducer;
