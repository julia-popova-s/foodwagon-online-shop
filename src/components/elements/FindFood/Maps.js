/* eslint-disable max-len */
import { GeolocationControl, Map, ObjectManager, Placemark, Polygon, YMaps } from '@pbe/react-yandex-maps';

import './balloon.css';
import { reverseСoordinates } from './getDeliveryZone';

const getMiniBalloon = (address) => `<div class="balloon">
<div class="balloon__contact">Your location</div>
<div class="balloon__address">${address}</div>
</div>`;

export const Maps = ({ address, geolocation, placemarks }) => {
  return (
    <YMaps
      query={{
        apikey: process.env.REACT_APP_YANDEX_API_KEY,
        load: 'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon,control.GeolocationControl',
        ns: 'use-load-option',
      }}
    >
      <Map
        defaultState={{
          center: geolocation,
          controls: ['zoomControl', 'fullscreenControl', 'geolocationControl'],
          zoom: 9,
        }}
        className="map"
      >
        <Polygon
          options={{
            fillColor: '#ed4543',
            opacity: 0.5,
            strokeColor: '#b3b3b3',
            strokeOpacity: 0,
            strokeStyle: 'shortdash',
            strokeWidth: 0,
          }}
          geometry={reverseСoordinates}
        />
        {/* <GeolocationControl
          options={{
            float: 'left',
            noPlacemark: false,
          }}
        /> */}
        <Placemark
          options={{
            iconImageHref: `${process.env.PUBLIC_URL}/images/find-food/search-panel/location.svg`,
            iconImageOffset: [0, 0],
            iconImageSize: [30, 30],
            iconLayout: 'default#image',
          }}
          properties={{
            balloonContent: getMiniBalloon(address),
          }}
          geometry={geolocation}
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
