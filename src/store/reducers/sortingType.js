import { createSlice } from '@reduxjs/toolkit'

const sortingTypeSlice = createSlice({
  initialState: {
    category: 0,
    order: 'desc',
    sortType: 'rating',
  },
  name: 'sortingType',
  reducers: {
    setCategory(state, action) {
      state.category = action.payload
    },
    setSortType(state, action) {
      state.sortType = action.payload.type
      state.order = action.payload.order
    },
  },
})

export const categorySelector = (state) => state.sortingType.category
export const orderSelector = (state) => state.sortingType.order
export const sortTypeSelector = (state) => state.sortingType.sortType

export const { setCategory, setSortType } = sortingTypeSlice.actions
export default sortingTypeSlice.reducer
