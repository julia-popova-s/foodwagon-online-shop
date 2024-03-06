import { GeoObject, GeocoderResponse, LocationItem } from '../store/slices/location/types';

export const getGeolocationCoordinates = (response: GeocoderResponse): LocationItem[] => {
  return response?.response?.GeoObjectCollection?.featureMember.map((el: { GeoObject: GeoObject }) => {
    const geoObject = el?.GeoObject;
    const addressDetails = geoObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components.map(({ kind, name }) => {
      return { [kind]: name };
    });
    return {
      address: geoObject?.metaDataProperty?.GeocoderMetaData?.Address?.formatted,
      addressDetails,
      coords: geoObject?.Point?.pos.split(' ').map((coord) => Number(Number(coord).toFixed(6))),
    };
  });
};
