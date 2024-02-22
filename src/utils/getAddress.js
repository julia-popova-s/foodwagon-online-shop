export const getExactAddress = (response) => {
  console.log(response);
  return response?.response?.GeoObjectCollection?.featureMember[0]['GeoObject']['metaDataProperty']['GeocoderMetaData'][
    'Address'
  ]['formatted'];
};
