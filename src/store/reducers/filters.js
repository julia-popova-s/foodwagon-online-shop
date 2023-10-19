import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  initialState: {
    category: 0,
    currentPage: 1,
    searchBy: null,
    sortType: 'popular',
  },
  name: 'filters',
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

export const categorySelector = (state) => state.filters.category
export const currentPageSelector = (state) => state.filters.currentPage
export const searchBySelector = (state) => state.filters.searchBy
export const sortTypeSelector = (state) => state.filters.sortType

export const { setCategory, setCurrentPage, setSearchBy, setSortBy } = filterSlice.actions
export default filterSlice.reducer
