import { createSlice } from '@reduxjs/toolkit';

import { RootStore } from '..';

const sortingTypeSlice = createSlice({
  initialState: {
    order: 'desc',
    sortType: 'rating',
  },
  name: 'sortingType',
  reducers: {
    setSortType(state, action) {
      state.sortType = action.payload.type;
      state.order = action.payload.order;
    },
  },
});

export const orderSelector = (state: RootStore) => state.sortingType.order;
export const sortTypeSelector = (state: RootStore) => state.sortingType.sortType;

export const { setSortType } = sortingTypeSlice.actions;
export default sortingTypeSlice.reducer;
