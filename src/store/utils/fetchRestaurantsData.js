export const fetchRestaurantsData = async function (
  { category, limit, restaurantId, sortType },
  { rejectWithValue }
) {
  const idRequest = restaurantId ? `&id=${restaurantId}` : ''
  const sortRequest =
    sortType && sortType === 'rating'
      ? '&sortBy=weighted_rating_value&order=desc'
      : sortType === 'popular'
      ? '&sortBy=aggregated_rating_count&order=desc'
      : sortType === 'name'
      ? '&sortBy=name&order=asc'
      : sortType === 'time'
      ? '&sortBy=deliveryTime&order=asc'
      : ''

  const categoryRequest = category && category !== 'All' ? `&cuisines=${category}` : ''

  try {
    const response = await fetch(
      `https://647c7cd1c0bae2880ad0c1a4.mockapi.io/foodwagon/restaurants?${categoryRequest}${
        limit ? `&page=1&limit=${limit}` : ''
      }${sortRequest}${idRequest}`
    )
    if (!response.ok) {
      return rejectWithValue(response.status)
    }
    return await response.json()
  } catch (error) {
    return rejectWithValue(error.message)
  }
}
