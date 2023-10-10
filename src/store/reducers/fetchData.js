export const fetchData = async function (params, { dispatch, rejectWithValue, setLoaded }) {
  const { category, filter, limit, order, page, restaurantId, sortType, url } = params

  dispatch(setLoaded(false))

  const urlRequest = url === 'products' ? url : 'restaurants'
  const sortRequest = sortType ? `&sortBy=${sortType}&order=${order}` : ''
  const categoryRequest = category && category !== 'All' ? `&category=${category}` : ''
  const idRequest = restaurantId ? `&restaurantId=${restaurantId}` : ''
  const limitRequest = limit ? `&limit=${limit}` : `&limit=4`
  const currentPage = page ? `&page=${page}` : `&page=1`
  const sortReq =
    url === 'restaurants' && sortType && sortType === 'rating'
      ? '&sortBy=weighted_rating_value&order=desc'
      : sortType === 'popular'
      ? '&sortBy=aggregated_rating_count&order=desc'
      : sortType === 'name'
      ? '&sortBy=name&order=asc'
      : sortType === 'time'
      ? '&sortBy=deliveryTime&order=asc'
      : ''

  const categoryReq =
    url === 'restaurants' && category && category !== 'All' ? `&cuisines=${category}` : ''
  try {
    const response = await fetch(
      `https://647c7cd1c0bae2880ad0c1a4.mockapi.io/foodwagon/${urlRequest}?${
        filter ? filter : ''
      }${idRequest}${categoryRequest}${sortRequest}${sortReq}${categoryReq}${currentPage}${limitRequest}`
    )
    if (!response.ok) {
      throw new Error(`ServerError: ${response.status} ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    return rejectWithValue(error.message)
  }
}
