/* eslint-disable max-len */
import { Map, ObjectManager, Placemark, YMaps } from '@pbe/react-yandex-maps';
import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';
import cn from 'classnames';
import debounce from 'lodash.debounce';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { ReactSVG } from 'react-svg';
import ymaps from 'yandex-maps';

import { Coords } from '../../../store/slices/location/types';
import { PlacemarkType } from '../../../store/slices/restaurants/types';
import { ModeUseMaps } from '../FindFood/FindFood';
import { Balloon } from './Balloon';
import { deliveryZones } from './deliveryZones';
import style from './maps.module.scss';

type MapsProps = {
  coord: Coords;
  handleChangeAddress: (address: string) => void;
  handleChangeCoord: (coord: Coords) => void;
  handleChangeMode: (mode: string) => void;
  handleChangeStatus: (status: boolean) => void;
  mode: string;
  place: string;
  placemarks: PlacemarkType[];
};

export const Maps: FC<MapsProps> = ({
  coord,
  handleChangeAddress,
  handleChangeCoord,
  handleChangeMode,
  handleChangeStatus,
  mode,
  place,
  placemarks,
}) => {
  useWhyDidYouUpdate('Maps', {
    coord,
    handleChangeAddress,
    handleChangeCoord,
    handleChangeMode,
    handleChangeStatus,
    mode,
    place,
    placemarks,
  });
  const [maps, setMaps] = useState<any>();
  const [deliveryStatus, setDeliveryStatus] = useState<boolean>(true);
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

  const handleBoundsChange = (event: any) => {
    getGeoLocation(event);
  };

  const getGeoLocation = (event: any) => {
    handleChangeMode(ModeUseMaps.MAPS);
    const coord = event.get('target').getCenter();
    updateSearchValue(coord);
  };

  const handleChangeZoom = (event: any) => {
    getGeoLocation(event);
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
    if (mode === 'input') {
      mapRef?.current?.panTo(coord);
    }
  }, [mode, coord]);

  useEffect(() => {
    if (zone && placemarkRef.current) {
      const targetZone = zone.searchContaining(placemarkRef.current).get(0);

      if (targetZone) {
        setDeliveryStatus(true);
        handleChangeStatus(true);
      } else {
        setDeliveryStatus(false);
        handleChangeStatus(false);
      }
    }

    if (maps && coord?.length) {
      setIsLoaded(false);

      const resp = maps?.geocode(coord);
      resp
        .then((res: any) => {
          setIsLoaded(true);
          const geocodeResult: ymaps.GeocodeResult = res.geoObjects.get(0);
          handleChangeAddress(geocodeResult.getAddressLine());
        })
        .catch((error: any) => {
          console.error('The Promise is rejected!', error);
        });
    }
  }, [coord, zone]);

  const handleActionBegin = (e: any) => {
    setVisibleBalloon(false);
    setIsActive(true);
  };

  const handleActionEnd = () => {
    setIsActive(false);
  };

  const handleChangeBalloonStatus = () => {
    setVisibleBalloon(!visibleBalloon);
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
        defaultState={{
          behaviors: ['default'],
          center: coord,
          controls: ['zoomControl', 'fullscreenControl', 'geolocationControl'],
          zoom: 15,
        }}
        modules={[
          'geolocation',
          'geocode',
          'control.ZoomControl',
          'control.FullscreenControl',
          'geoObject.addon.balloon',
          'control.GeolocationControl',
          'geoQuery',
        ]}
        className={style.map}
        instanceRef={mapRef}
        onActionBegin={handleActionBegin}
        onActionEnd={handleActionEnd}
        onBoundsChange={handleBoundsChange}
        onLoad={onLoad}
        onWheel={handleChangeZoom}
      >
        <div className={cn(style.pointer, { [style.active]: isActive })} onClick={handleChangeBalloonStatus}>
          <ReactSVG
            className={cn(style.placemark, { [style.active]: isActive })}
            src={`${process.env.PUBLIC_URL}/images/find-food/search-panel/location.svg`}
            wrapper="span"
          />
          {!isLoaded && (
            <ReactSVG className={style.preloader} src={`${process.env.PUBLIC_URL}/images/find-food/preloader.svg`} />
          )}
        </div>

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
        <Balloon
          address={place}
          coord={coord}
          handleClick={handleChangeBalloonStatus}
          isActive={visibleBalloon}
          status={deliveryStatus}
        />
      </Map>
    </YMaps>
  );
};
