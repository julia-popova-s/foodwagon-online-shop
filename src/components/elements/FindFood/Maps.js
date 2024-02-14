/* eslint-disable max-len */
import { Map, ObjectManager, Placemark, YMaps } from '@pbe/react-yandex-maps';
import cn from 'classnames';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ReactSVG } from 'react-svg';

import { DeliverAddress } from '../Header/DeliverAddress';
import './balloon.css';
import { deliveryZones } from './deliveryZones';

export const Maps = ({ coord, handleChangeAddress, handleChangeCoord, place, placemarks }) => {
  const [maps, setMaps] = useState(null);
  const [status, setStatus] = useState(true);
  const [zone, setZone] = useState(null);
  const [isActive, setIsActive] = useState(null);
  const [visibleBalloon, setVisibleBalloon] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);

  const mapRef = useRef(null);
  const placemarkRef = useRef(null);

  const updateSearchValue = useCallback(
    debounce((coord) => {
      handleChangeCoord(coord);
    }, 1000),
    [],
  );
  const getGeoLocation = (e) => {
    const coord = e.get('target').getCenter();
    updateSearchValue(coord);
  };

  const onLoad = (map) => {
    setMaps(map);

    if (map && mapRef.current) {
      const deliveryZone = map?.geoQuery(deliveryZones).addToMap(mapRef.current);
      deliveryZone.each(function (obj) {
        obj.options.set({
          fillColor: obj.properties.get('fill'),
          fillOpacity: obj.properties.get('fill-opacity'),
          strokeColor: obj.properties.get('stroke'),
          strokeOpacity: obj.properties.get('stroke-opacity'),
          strokeWidth: obj.properties.get('stroke-width'),
        });
        obj.properties.set('balloonContent', obj.properties.get('description'));
      });

      setZone(deliveryZone);
    }
  };

  useEffect(() => {
    if (zone && placemarkRef.current) {
      const targetZone = zone.searchContaining(placemarkRef.current).get(0);

      if (targetZone) {
        setStatus(true);
      } else {
        setStatus(false);
      }
    }

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

  const handleActionEnd = () => {
    setIsActive(false);
  };

  const handleVisibleBalloon = () => {
    setVisibleBalloon(true);
  };

  return (
    <YMaps
      query={{
        apikey: process.env.REACT_APP_YANDEX_API_KEY,
        coordorder: 'longlat',
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
          'geoQuery',
        ]}
        state={{
          behaviors: ['default'],
          center: coord,
          controls: ['zoomControl', 'fullscreenControl', 'geolocationControl'],
          zoom: 9,
        }}
        className="map"
        instanceRef={mapRef}
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
          {!isLoaded && (
            <ReactSVG className="preloader" src={`${process.env.PUBLIC_URL}/images/find-food/preloader.svg`} />
          )}
        </div>

        <Placemark geometry={coord} instanceRef={placemarkRef} options={{ iconOffset: [0, 0], visible: false }} />

        <ObjectManager
          clusters={{
            preset: 'islands#redClusterIcons',
          }}
          objects={{
            openBalloonOnClick: true,
            preset: 'islands#redDotIcon',
          }}
          options={{
            clusterize: true,
            gridSize: 50,
          }}
          features={placemarks}
          modules={['objectManager.addon.objectsBalloon', 'objectManager.addon.objectsHint', 'objectManager.Balloon']}
        />

        <div className={cn('balloon', { visible: visibleBalloon })}>
          <div className="balloon__contact">Your location</div>
          <div className="balloon__address">{place}</div>
          <div>{status ? 'Delivery available' : 'No delivery'}</div>
        </div>
      </Map>
    </YMaps>
  );
};
