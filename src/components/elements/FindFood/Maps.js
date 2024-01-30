import { Map, ObjectManager, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { useSelector } from 'react-redux';

import './balloon.css';

const getBalloon = (address) => `<div class="balloon">
<div class="balloon__contact">Your location</div>
<div class="balloon__address">${address}</div>
</div>`;

export const Maps = ({ address, geolocation }) => {
  const { placemarks } = useSelector((state) => state.restaurants);

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
          zoom: 11,
        }}
        className="map"
      >
        <Placemark
          options={{
            iconImageHref: `${process.env.PUBLIC_URL}/images/find-food/search-panel/location.svg`,
            iconImageOffset: [0, 0],
            iconImageSize: [30, 30],
            iconLayout: 'default#image',
          }}
          properties={{
            balloonContent: getBalloon(address),
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
