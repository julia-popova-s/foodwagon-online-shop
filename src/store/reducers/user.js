import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: null,
  id: null,
  token: null,
}

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    removeUser(state) {
      state.email = null
      state.token = null
      state.id = null
    },
    setUser(state, action) {
      state.email = action.payload.email
      state.token = action.payload.token
      state.id = action.payload.id
    },
  },
})

export const emailSelector = (state) => state.user.email
export const tokenSelector = (state) => state.user.token
export const idSelector = (state) => state.user.id

export const { removeUser, setUser } = userSlice.actions
export default userSlice.reducer
