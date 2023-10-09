import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  initialState: {
    category: 0,
    currentPage: 1,
    searchBy: null,
    sortType: 'popular',
  },
  name: 'filter',
  reducers: {
    setCategory(state, action) {
      state.category = action.payload
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setSearchBy(state, action) {
      state.searchBy = action.payload
    },
    setSortBy(state, action) {
      state.sortType = action.payload
    },
  },
})

export const { setCategory, setCurrentPage, setSearchBy, setSortBy } = filterSlice.actions
export default filterSlice.reducer
