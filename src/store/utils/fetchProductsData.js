import axios from 'axios'

import { getFilterForProducts } from './getFilterForProducts'

export const fetchProductsData = async function (params, { rejectWithValue }) {
  const error =
    'Nothing was found according to your request. Try to find another option or shorten your request.'

  if (params.searchValue === '') {
    return rejectWithValue(error)
  }

  const filter = getFilterForProducts(params)

  try {
    const { data } = await axios.get(
      `https://647c7cd1c0bae2880ad0c1a4.mockapi.io/foodwagon/products${filter}`
    )

    if (data.length === 0) {
      return rejectWithValue(error)
    }
    return data
  } catch (error) {
    return rejectWithValue('Error: ' + error.message)
  }
}
