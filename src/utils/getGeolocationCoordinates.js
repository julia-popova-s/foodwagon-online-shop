export const getGeolocationCoordinates = (response) => {
  // return response?.response?.GeoObjectCollection?.featureMember[0]['GeoObject']['Point']['pos'].split(' ');
  return response?.response?.GeoObjectCollection?.featureMember.map((el) => {
    const geoObject = el?.GeoObject;
    return {
      address: geoObject?.metaDataProperty?.GeocoderMetaData?.Address?.formatted,
      coords: geoObject?.Point?.pos.split(' '),
    };
  });
};
