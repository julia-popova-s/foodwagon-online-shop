/* eslint-disable max-len */
import { Map, ObjectManager, Polygon, YMaps } from '@pbe/react-yandex-maps';
import cn from 'classnames';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';

import { useAppDispatch } from '../../../store';
import { coordsSelector, setLocation } from '../../../store/slices/location/slice';
import './balloon.css';
import { reverseСoordinates } from './getDeliveryZone';

const getMiniBalloon = (address) => `<div class="balloon">
<div class="balloon__contact">Your location</div>
<div class="balloon__address">${address}</div>
</div>`;

const i = 0;

export const Maps = ({ placemarks, requestText }) => {
  // console.log(i++);
  const [maps, setMaps] = useState(null);
  const [isActive, setIsActive] = useState(null);
  const mapRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);
  const [coord, setCoord] = useState(null);
  const [address, setAddress] = useState(null);
  // console.log(address);

  const dispatch = useAppDispatch();
  const coords = useSelector(coordsSelector);
  // console.log(coord);

  const updateSearchValue = useCallback(
    debounce((coords) => {
      setCoord(coords);
    }, 500),
    [],
  );
  const getGeoLocation = (e) => {
    const coords = e.get('target').getCenter();
    updateSearchValue(coords);

    // const resp = maps?.geocode(coord);
    // resp.then((res) => {
    //   setAddress(res.geoObjects.get(0).getAddressLine());
    //   dispatch(setLocation({ address, coords }));
    // });
  };

  const onLoad = (map) => {
    setMaps(map);
  };
  // console.log(requestText);

  // useEffect(() => {
  //   if (requestText)
  //     maps?.geocode(requestText).then((res) => {
  //       const coords = res.geoObjects.get(0).geometry.getCoordinates();
  //       const address = res.geoObjects.get(0).getAddressLine();
  //       setCoord(coords);
  //       setLocation(address);
  //       dispatch(setLocation({ address, coords }));
  //     });
  // }, [requestText]);

  useEffect(() => {
    if (coord) {
      setIsLoaded(false);

      const resp = maps?.geocode(coord);
      resp.then((res) => {
        setIsLoaded(true);
        setAddress(res.geoObjects.get(0).getAddressLine());
        dispatch(setLocation({ address, coords }));
      });
      // mapRef?.current?.panTo(coord, {
      //   checkZoomRange: true,
      //   delay: 1000,
      //   duration: 500,
      //   flying: true,
      //   timingFunction: 'ease',
      // });
    }
  }, [coord]);

  // useEffect(() => {
  //   maps?.panTo(coords);
  // }, [maps]);

  const handleActionBegin = () => {
    setIsActive(true);
  };

  const handleActionEnd = (e) => {
    setIsActive(false);
  };
  console.log(isActive);

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
        instanceRef={mapRef}
        onActionBegin={handleActionBegin}
        onActionEnd={handleActionEnd}
        onBoundsChange={(ymaps) => getGeoLocation(ymaps)}
        onLoad={(ymaps) => onLoad(ymaps)}
      >
        <div className={cn('pointer', { active: isActive })}>
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
      </Map>
    </YMaps>
  );
};

// // Инициализация карты из результата геокодирования
// var myMap;
// ymaps.geocode('Москва').then(function (res) {
//     myMap = new ymaps.Map('map', {
//         center: res.geoObjects.get(0).geometry.getCoordinates(),
//         zoom :
//      });
// });
