import { Map, ObjectManager, Placemark, YMaps } from '@pbe/react-yandex-maps';
import cn from 'classnames';
import debounce from 'lodash.debounce';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';
import ymaps from 'yandex-maps';

import { isLoadedSelector } from '../../../store/slices/location/slice';
import { Coords } from '../../../store/slices/location/types';
import { placemarkSelector } from '../../../store/slices/restaurants/slice';
import { Balloon } from './Balloon';
import { deliveryZones } from './deliveryZones';
import style from './maps.module.scss';

export enum ModeOfUsingMaps {
  DRAG = 'drag',
  SEARCH = 'search',
}

export type AddressProps = {
  address: string;
  premiseNumber: null | string;
  streetName: null | string;
};

type MapsProps = {
  coord: Coords;
  handleChangeCoord: (coord: Coords) => void;
  handleChangeMode: (mode: string) => void;
  handleChangeStatus: (status: boolean) => void;
  mode: string;
  place: string;
};

export const Maps: FC<MapsProps> = ({
  coord,
  handleChangeCoord,
  handleChangeMode,
  handleChangeStatus,
  mode,
  place,
}) => {
  const [maps, setMaps] = useState<any>();
  const [zone, setZone] = useState<any>(null);
  const [activeAction, setActiveAction] = useState<boolean>(false);
  const [visibleBalloon, setVisibleBalloon] = useState<boolean>(false);
  const [deliveryStatus, setDeliveryStatus] = useState<boolean>(true);

  const placemarks = useSelector(placemarkSelector);
  const isLoaded = useSelector(isLoadedSelector);
  console.log(placemarks);
  const mapRef = useRef<ymaps.Map>();
  const placemarkRef = useRef<ymaps.Map>();

  const updateSearchValue = useCallback(
    debounce((coord: Coords) => {
      handleChangeCoord(coord);
    }, 500),
    [],
  );

  const getGeoLocation = (event: any) => {
    handleChangeMode(ModeOfUsingMaps.DRAG);
    const coord = event.get('target').getCenter();
    updateSearchValue(coord);
  };

  const handleBoundsChange = (event: Event) => {
    getGeoLocation(event);
  };

  const handleChangeZoom = (event: Event) => {
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
    if (mode === ModeOfUsingMaps.SEARCH) {
      mapRef?.current?.panTo(coord, { delay: 500, safe: true });
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
  }, [coord, handleChangeStatus, zone]);

  const handleActionBegin = () => {
    setVisibleBalloon(false);
    setActiveAction(true);
  };

  const handleActionEnd = () => {
    setActiveAction(false);
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
          controls: ['zoomControl', 'geolocationControl'],
          zoom: 15,
        }}
        modules={[
          'geolocation',
          'geocode',
          'control.ZoomControl',
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
        <div className={cn(style.placemark, { [style.active]: activeAction })} onClick={handleChangeBalloonStatus}>
          <ReactSVG
            className={cn(style.placemark__icon, { [style.active]: activeAction })}
            src={`${process.env.PUBLIC_URL}/images/find-food/search-panel/location.svg`}
            wrapper="span"
          />
          {!isLoaded && (
            <ReactSVG
              className={style.placemark__preloader}
              src={`${process.env.PUBLIC_URL}/images/find-food/preloader.svg`}
            />
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
