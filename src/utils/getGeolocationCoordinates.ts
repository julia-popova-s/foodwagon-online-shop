import { GeoObject, GeocoderResponse, LocationItem } from '../store/slices/location/types';

export const getGeolocationCoordinates = (response: GeocoderResponse): LocationItem[] => {
  return response?.response?.GeoObjectCollection?.featureMember.map((el: { GeoObject: GeoObject }) => {
    const geoObject = el?.GeoObject;
    return {
      address: geoObject?.metaDataProperty?.GeocoderMetaData?.Address?.formatted,
      components: geoObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components,
      coords: geoObject?.Point?.pos.split(' ').map((coord) => Number(Number(coord).toFixed(6))),
    };
  });
};
