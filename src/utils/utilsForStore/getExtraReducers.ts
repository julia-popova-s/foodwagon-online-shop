import type { ActionReducerMapBuilder, PayloadAction, ProductSliceState } from '@reduxjs/toolkit';

export const getExtraReducers = (builder: ActionReducerMapBuilder<ProductSliceState>) => (fetch) => {
  builder
    .addCase(fetch.fulfilled, (state, action: PayloadAction) => {
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
    .addCase(fetch.rejected, (state, action) => {
      state.status = 'rejected';
      state.isLoaded = false;
      state.list = [];
      state.error = action.payload;
    });
};
