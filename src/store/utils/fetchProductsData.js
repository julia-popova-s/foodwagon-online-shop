import axios from 'axios'

export const fetchProductsData = async function (params, { rejectWithValue }) {
  const { category, filter, limit, order, page, restaurantId, sortType } = params

  const sortRequest = sortType ? `&sortBy=${sortType}&order=${order}` : ''

  const categoryRequest = category && category !== 'All' ? `&category=${category}` : ''

  const idRequest = restaurantId ? `&restaurantId=${restaurantId}` : ''

  const limitRequest = limit ? `&limit=${limit}` : `&limit=8`

  const currentPage = page ? `&page=${page}` : `&page=1`

  try {
    const { data } = await axios.get(
      `https://647c7cd1c0bae2880ad0c1a4.mockapi.io/foodwagon/products?${
        filter ? filter : ''
      }${idRequest}${categoryRequest}${sortRequest}${currentPage}${limitRequest}
        `
    )

    if (data.length === 0) {
      return rejectWithValue(
        'Nothing was found according to your request. Try to find another option or shorten your request.'
      )
    }
    return data
  } catch (error) {
    return rejectWithValue('Error: ' + error.message)
  }
}
