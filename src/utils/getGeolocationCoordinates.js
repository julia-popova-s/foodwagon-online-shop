export const getGeolocationCoordinates = (response) => {
  return response?.response?.GeoObjectCollection?.featureMember[0]['GeoObject']['Point']['pos'].split(' ');
};
