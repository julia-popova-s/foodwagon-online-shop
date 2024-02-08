/* eslint-disable max-len */
import { Map, ObjectManager, Polygon, YMaps } from '@pbe/react-yandex-maps';
import cn from 'classnames';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';

import { useAppDispatch } from '../../../store';
import { addressSelector, coordsSelector, setLocation } from '../../../store/slices/location/slice';
import { placemarkSelector } from '../../../store/slices/restaurants/slice';
import './balloon.css';
import { reverseСoordinates } from './getDeliveryZone';

export const Maps = () => {
  const [maps, setMaps] = useState(null);
  const [isActive, setIsActive] = useState(null);
  const [visibleBalloon, setVisibleBalloon] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const [coord, setCoord] = useState(null);
  const placemarks = useSelector(placemarkSelector);

  const dispatch = useAppDispatch();
  const coords = useSelector(coordsSelector);
  const address = useSelector(addressSelector);

  const updateSearchValue = useCallback(
    debounce((coords) => {
      setCoord(coords);
    }, 500),
    [],
  );
  const getGeoLocation = (e) => {
    const coords = e.get('target').getCenter();
    updateSearchValue(coords);
  };

  const onLoad = (map) => {
    setMaps(map);
  };

  useEffect(() => {
    if (coord?.length) {
      setIsLoaded(false);

      const resp = maps?.geocode(coord);
      resp.then((res) => {
        setIsLoaded(true);
        dispatch(setLocation({ address: res.geoObjects.get(0).getAddressLine(), coords: coord }));
      });
    }
  }, [coord]);

  const handleActionBegin = () => {
    setIsActive(true);
  };

  const handleActionEnd = (e) => {
    setIsActive(false);
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
          center: coords,
          controls: ['zoomControl', 'fullscreenControl', 'geolocationControl'],
          zoom: 15,
        }}
        className="map"
        onActionBegin={handleActionBegin}
        onActionEnd={handleActionEnd}
        onBoundsChange={(ymaps) => getGeoLocation(ymaps)}
        onLoad={(ymaps) => onLoad(ymaps)}
      >
        <div className={cn('pointer', { active: isActive })} onClick={() => setVisibleBalloon(true)}>
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
          modules={['objectManager.addon.objectsBalloon', 'objectManager.addon.objectsHint']}
        />
        <div className={cn('balloon', { visible: visibleBalloon })}>
          <div className="balloon__contact">Your location</div>
          <div className="balloon__address">{address}</div>
        </div>
      </Map>
    </YMaps>
  );
};
