import { createSlice } from '@reduxjs/toolkit'

const sortingTypeSlice = createSlice({
  initialState: {
    order: 'desc',
    sortType: 'rating',
  },
  name: 'sortingType',
  reducers: {
    setSortType(state, action) {
      state.sortType = action.payload.type
      state.order = action.payload.order
    },
  },
})

export const orderSelector = (state) => state.sortingType.order
export const sortTypeSelector = (state) => state.sortingType.sortType

export const { setSortType } = sortingTypeSlice.actions
export default sortingTypeSlice.reducer
