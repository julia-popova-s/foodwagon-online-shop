/* eslint-disable max-len */
import { Map, ObjectManager, Placemark, YMaps } from '@pbe/react-yandex-maps';
import cn from 'classnames';
import debounce from 'lodash.debounce';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { Event } from 'yandex-maps';

import { PlacemarkType } from '../../../store/slices/restaurants/types';
import './balloon.css';
import { deliveryZones } from './deliveryZones';

type MapsProps = {
  coord: [number, number];
  handleChangeAddress: (address: string) => void;
  handleChangeCoord: (coord: [number, number]) => void;
  place: string;
  placemarks: PlacemarkType[];
};

export const Maps: FC<MapsProps> = ({ coord, handleChangeAddress, handleChangeCoord, place, placemarks }) => {
  const [maps, setMaps] = useState<any>();
  const [status, setStatus] = useState<boolean>(true);
  const [zone, setZone] = useState<any>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [visibleBalloon, setVisibleBalloon] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  const mapRef = useRef<ymaps.Map>();
  const placemarkRef = useRef<any>();

  const updateSearchValue = useCallback(
    debounce((coord) => {
      handleChangeCoord(coord);
    }, 500),
    [],
  );

  const getGeoLocation = (e: Event) => {
    const coord = e.get('target').getCenter();
    updateSearchValue(coord);
  };

  const onLoad = (map: any) => {
    setMaps(map);

    if (map && mapRef.current) {
      const deliveryZone = map?.geoQuery(deliveryZones).addToMap(mapRef.current);
      deliveryZone.each(function (obj: any) {
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
        .then((res: any) => {
          setIsLoaded(true);
          handleChangeAddress(res.geoObjects.get(0).getAddressLine());
        })
        .catch((error: any) => {
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
          zoom: 15,
        }}
        className="map"
        instanceRef={mapRef}
        onActionBegin={handleActionBegin}
        onActionEnd={handleActionEnd}
        onBoundsChange={getGeoLocation}
        onLoad={onLoad}
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
