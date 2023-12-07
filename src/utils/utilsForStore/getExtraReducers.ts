export const getExtraReducers = (builder) => (fetch) => {
  builder
    .addCase(fetch.fulfilled, (state, action) => {
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
