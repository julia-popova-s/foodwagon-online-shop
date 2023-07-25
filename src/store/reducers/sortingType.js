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

export const { setCategory, setSortType } = sortingTypeSlice.actions
export default sortingTypeSlice.reducer
