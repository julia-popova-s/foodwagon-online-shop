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
  console.log(geolocation);
  const [maps, setMaps] = useState(null);
  const [address2, setAddress] = useState('');
  const [coords, setCoords] = useState(geolocation);

  const getGeoLocation = (e) => {
    const coord = e.get('target').getCenter();
    setCoords(coord);
    // const aa = e.get('target').panTo(coord, {
    //   delay: 1000,
    //   duration: 1000,
    //   flying: true,
    //   safe: true,
    //   timingFunction: 'ease-in-out',
    // });
    setCoords(coord);
    const resp = maps?.geocode(coord);
    resp.then((res) => {
      setAddress(res.geoObjects.get(0).getAddressLine());
    });
  };

  const onLoad = (map) => {
    setMaps(map);
  };

  useEffect(() => {
    maps?.geocode(geolocation).then((res) => {
      setAddress(res.geoObjects.get(0).getAddressLine());
      setCoords(geolocation);
    });
  }, [geolocation, maps]);

  return (
    <YMaps
      query={{
        apikey: process.env.REACT_APP_YANDEX_API_KEY,
        lang: 'en_RU',
      }}
    >
      <Map
        modules={[
          'geolocation',
          'geocode',
          'control.ZoomControl',
          'control.FullscreenControl',
          'geoObject.addon.balloon',
          'control.GeolocationControl',
        ]}
        state={{
          behaviors: ['default'],
          center: coords,
          controls: ['zoomControl', 'fullscreenControl', 'geolocationControl'],
          zoom: 9,
        }}
        className="map"
        onBoundsChange={(ymaps) => getGeoLocation(ymaps)}
        onLoad={(ymaps) => onLoad(ymaps)}
      >
        <div className="pointer">
          <img alt="pointer" src={`${process.env.PUBLIC_URL}/images/find-food/search-panel/location.svg`} />
        </div>
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
