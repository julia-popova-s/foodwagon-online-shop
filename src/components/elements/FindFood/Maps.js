/* eslint-disable max-len */
import { Map, ObjectManager, Placemark, Polygon, YMaps } from '@pbe/react-yandex-maps';
import { useEffect, useState } from 'react';

import './balloon.css';
import { reverseСoordinates } from './getDeliveryZone';

const getMiniBalloon = (address) => `<div class="balloon">
<div class="balloon__contact">Your location</div>
<div class="balloon__address">${address}</div>
</div>`;

export const Maps = ({ address, geolocation, placemarks }) => {
  const [maps, setMaps] = useState(null);
  const [address2, setAddress] = useState('');
  const [coords, setCoords] = useState(geolocation);

  const getGeoLocation = (e) => {
    console.log(e.get('target'));
    const coord = e.get('target').getCenter();
    setCoords(coord);

    const resp = maps.geocode(coord);
    resp.then((res) => {
      setAddress(res.geoObjects.get(0).getAddressLine());
    });
  };

  const onLoad = (map) => {
    setMaps(map);
    console.log(map?.geolocation.get());
  };
  const handleActionTick = (e) => {
    // console.log(e.get('target'));
  };
  useEffect(() => {
    maps?.geocode(geolocation).then((res) => {
      setAddress(res.geoObjects.get(0).getAddressLine());
      setCoords(geolocation);
      console.log(coords);
      console.log(address2);
    });
    console.log(maps);
  }, [geolocation, maps]);

  return (
    <YMaps
      query={{
        apikey: process.env.REACT_APP_YANDEX_API_KEY,
        lang: 'en_RU',
      }}
    >
      <Map
        defaultState={{
          center: coords,
          controls: ['zoomControl', 'fullscreenControl', 'geolocationControl'],
          duration: 1000,
          timingFunction: 'ease-in',
          yandexMapDisablePoiInteractivity: false,
          zoom: 15,
        }}
        modules={[
          'geolocation',
          'geocode',
          'control.ZoomControl',
          'control.FullscreenControl',
          'geoObject.addon.balloon',
          'control.GeolocationControl',
        ]}
        className="map"
        onActionTick={handleActionTick}
        onBoundsChange={(ymaps) => getGeoLocation(ymaps)}
        onLoad={(ymaps) => onLoad(ymaps)}
        state={{ center: coords }}
      >
        <Polygon
          options={{
            fillColor: '#ed4543',
            opacity: 0.2,
            strokeColor: '#b3b3b3',
            strokeOpacity: 0,
            strokeStyle: 'shortdash',
            strokeWidth: 0,
          }}
          geometry={reverseСoordinates}
        />
        <Placemark
          options={{
            duration: 100,
            iconImageHref: `${process.env.PUBLIC_URL}/images/find-food/search-panel/location.svg`,
            iconImageOffset: [0, 0],
            iconImageSize: [30, 42],
            iconLayout: 'default#image',
            timingFunction: 'ease',
          }}
          properties={{
            balloonContent: getMiniBalloon(address2),
          }}
          geometry={coords}
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
};
