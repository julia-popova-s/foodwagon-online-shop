import { Map, ObjectManager, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getGeolocationCoordinates } from '../../../utils/getGeolocationCoordinates';
import { YandexGeocoder } from './YandexGeocoder';
import './balloon.css';

const getBalloon = (address) => `<div class="balloon">
<div class="balloon__contact">Your location</div>
<div class="balloon__address">${address}</div>
</div>`;

export const Maps = () => {
  const { placemarks } = useSelector((state) => state.restaurants);
  const [geolocation, setGeolocation] = useState(null);
  const address = 'Дубай, бульвар Мухаммед Бин Рашид, дом 1';
  const yandexGeocoder = new YandexGeocoder();

  useEffect(() => {
    yandexGeocoder.adressToGeopoint(address).then((res) => {
      const [lon, lat] = getGeolocationCoordinates(res);
      setGeolocation([lat, lon]);
    });
  }, [address]);

  if (geolocation) {
    return (
      <YMaps
        query={{
          apikey: process.env.REACT_APP_YANDEX_API_KEY,
          load: 'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon',
          ns: 'use-load-option',
        }}
      >
        <Map
          defaultState={{
            center: geolocation,
            controls: ['zoomControl', 'fullscreenControl'],
            zoom: 10,
          }}
          className="map"
        >
          <Placemark
            options={{
              iconImageHref: `${process.env.PUBLIC_URL}/images/find-food/search-panel/location.svg`,
              iconImageOffset: [0, 0],
              iconImageSize: [40, 40],
              iconLayout: 'default#image',
            }}
            properties={{
              balloonContent: getBalloon(address),
            }}
            defaultGeometry={geolocation}
          />
          <ObjectManager
            objects={{
              openBalloonOnClick: true,
              preset: 'islands#redDotIcon',
            }}
            options={{
              clusterize: false,
              gridSize: 150,
            }}
            features={placemarks}
            modules={['objectManager.addon.objectsBalloon', 'objectManager.addon.objectsHint']}
          />
        </Map>
      </YMaps>
    );
  } else {
    return null;
  }
};
