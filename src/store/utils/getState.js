export const getPendingState = (state) => {
  state.status = 'loading'
  state.isLoaded = false
  state.products = []
  state.error = null
}

export const getResolvedState = (state, action) => {
  state.status = 'resolve'
  state.products = action.payload
  state.isLoaded = true
  state.error = null
}

export const getRejectedState = (state, action) => {
  state.status = 'rejected'
  state.isLoaded = false
  state.products = []
  state.error = action.payload
}
