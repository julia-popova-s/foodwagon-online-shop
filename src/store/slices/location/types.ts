import { Status } from '../../utils/getExtraReducers';

export type Coords = number[];

export interface LocationItem {
  address: string;
  coords: Coords;
  deliveryStatus?: boolean;
}

export interface LocationSliceState {
  error: null;
  isLoaded: false;
  list: LocationItem[];
  location: LocationItem;
  status: Status.LOADING;
}
export interface GeoObject {
  Point: {
    pos: string;
  };
  boundedBy: {
    Envelope: {
      lowerCorner: string;
      upperCorner: string;
    };
  };
  description: string;
  metaDataProperty: {
    GeocoderMetaData: {
      Address: {
        Components: [
          {
            kind: string;
            name: string;
          },
          {
            kind: string;
            name: string;
          },
          {
            kind: string;
            name: string;
          },
          {
            kind: string;
            name: string;
          },
          {
            kind: string;
            name: string;
          },
          {
            kind: string;
            name: string;
          },
        ];
        country_code: string;
        formatted: string;
        postal_code: string;
      };
      AddressDetails: {
        Country: {
          AddressLine: string;
          AdministrativeArea: {
            AdministrativeAreaName: string;
            Locality: {
              LocalityName: string;
              Thoroughfare: {
                Premise: {
                  PostalCode: {
                    PostalCodeNumber: string;
                  };
                  PremiseNumber: string;
                };
                ThoroughfareName: string;
              };
            };
          };
          CountryName: string;
          CountryNameCode: string;
        };
      };
      kind: string;
      precision: string;
      text: string;
    };
  };
  name: string;
}
export interface GeocoderResponse {
  response: {
    GeoObjectCollection: {
      featureMember: [
        {
          GeoObject: GeoObject;
        },
      ];
      metaDataProperty: {
        GeocoderResponseMetaData: {
          Point?: {
            pos?: string;
          };
          found: string;
          request: string;
          results: string;
        };
      };
    };
  };
}
