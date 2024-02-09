/* eslint-disable max-len */
import { Map, ObjectManager, Polygon, YMaps } from '@pbe/react-yandex-maps';
import cn from 'classnames';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';

import './balloon.css';
import { reverseСoordinates } from './getDeliveryZone';

export const Maps = ({ coord, handleChangeAddress, handleChangeCoord, place, placemarks }) => {
  const [maps, setMaps] = useState(null);
  const [isActive, setIsActive] = useState(null);
  const [visibleBalloon, setVisibleBalloon] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);

  const updateSearchValue = useCallback(
    debounce((coord) => {
      handleChangeCoord(coord);
    }, 500),
    [],
  );
  const getGeoLocation = (e) => {
    const coord = e.get('target').getCenter();
    updateSearchValue(coord);
  };

  const onLoad = (map) => {
    setMaps(map);
  };

  useEffect(() => {
    if (maps && coord?.length) {
      setIsLoaded(false);
      const resp = maps?.geocode(coord);
      resp
        .then((res) => {
          setIsLoaded(true);
          handleChangeAddress(res.geoObjects.get(0).getAddressLine());
        })
        .catch((error) => {
          console.error('The Promise is rejected!', error);
        });
    }
  }, [coord]);

  const handleActionBegin = () => {
    setIsActive(true);
  };

  const handleActionEnd = (e) => {
    setIsActive(false);
  };

  const handleVisibleBalloon = () => {
    setVisibleBalloon(true);
  };

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
          center: coord,
          controls: ['zoomControl', 'fullscreenControl', 'geolocationControl'],
          zoom: 15,
        }}
        className="map"
        onActionBegin={handleActionBegin}
        onActionEnd={handleActionEnd}
        onBoundsChange={(ymaps) => getGeoLocation(ymaps)}
        onLoad={(ymaps) => onLoad(ymaps)}
      >
        <div className={cn('pointer', { active: isActive })} onClick={handleVisibleBalloon}>
          <ReactSVG
            className={cn('placemark', { active: isActive })}
            src={`${process.env.PUBLIC_URL}/images/find-food/search-panel/location.svg`}
            wrapper="span"
          />
          {!isLoaded && 'd'}
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
            clusterize: true,
            gridSize: 150,
          }}
          features={placemarks}
          modules={['objectManager.addon.objectsBalloon', 'objectManager.addon.objectsHint','objectManager.Balloon']}
        />
        <div className={cn('balloon', { visible: visibleBalloon })}>
          <div className="balloon__contact">Your location</div>
          <div className="balloon__address">{place}</div>
        </div>
      </Map>
    </YMaps>
  );
};
