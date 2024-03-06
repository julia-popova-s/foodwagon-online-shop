import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import cn from 'classnames';
import debounce from 'lodash.debounce';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';
import ymaps from 'yandex-maps';

import { Coords, DeliveryStatus, DistanceItem } from '../../../store/slices/location/types';
import { placemarkSelector } from '../../../store/slices/restaurants/slice';
import { Balloon } from './Balloon';
import { deliveryZones } from './deliveryZones';
import style from './maps.module.scss';

export type ExtendedAddress = {
  address: string;
  listOfDistances: DistanceItem[];
  premiseNumber: null | string;
};

export enum ModeOfUsingMaps {
  DRAG = 'drag',
  SEARCH = 'search',
}

type MapsProps = {
  coord: Coords;
  handleChangeAddress: ({ address, premiseNumber }: ExtendedAddress) => void;
  handleChangeCoord: (coord: Coords) => void;
  handleChangeMode: (mode: string) => void;
  handleChangeStatus: (status: DeliveryStatus) => void;
  mode: string;
  place: string;
};

export const Maps: FC<MapsProps> = ({
  coord,
  handleChangeAddress,
  handleChangeCoord,
  handleChangeMode,
  handleChangeStatus,
  mode,
  place,
}) => {
  const [maps, setMaps] = useState<any>();
  const [zone, setZone] = useState<any>(null);
  const [cafe, setCafe] = useState<any>(null);
  const [listOfDistances, setListOfDistances] = useState<DistanceItem[]>([]);
  const [activeAction, setActiveAction] = useState<boolean>(false);
  const [visibleBalloon, setVisibleBalloon] = useState<boolean>(false);
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus>();

  const placemarks = useSelector(placemarkSelector);
  const [loaded, setLoaded] = useState<boolean>(false);

  const mapRef = useRef<any>();
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

    if (map && mapRef.current && placemarks.length) {
      const cafe = map
        .geoQuery({
          features: placemarks,
          type: 'FeatureCollection',
        })
        .addToMap(mapRef.current);

      cafe.each((obj: any) => {
        obj.options.set({
          clusterize: true,
          gridSize: 50,
          openBalloonOnClick: true,
          preset: 'islands#redDotIcon',
        });
      });

      setCafe(cafe);
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
        setDeliveryStatus(DeliveryStatus.YES);
        handleChangeStatus(DeliveryStatus.YES);
      } else {
        setDeliveryStatus(DeliveryStatus.NO);
        handleChangeStatus(DeliveryStatus.NO);
      }
    }
  }, [coord, zone]);

  useEffect(() => {
    if (cafe && maps && coord?.length) {
      setListOfDistances([]);

      const sortedCafeList = cafe.sortByDistance(coord);
      sortedCafeList.each((obj: any) => {
        const distance = maps?.formatter?.distance(
          maps.coordSystem.geo.getDistance(coord, obj.geometry.getCoordinates()),
        );
        const id = obj.properties.get('id');
        obj.properties.set('balloonContentFooter', `Distance to You: ${distance}`);
        setListOfDistances((prev) => {
          return [...prev, { distance, id }];
        });
      });
    }
  }, [coord, cafe, maps]);

  useEffect(() => {
    if (mode === ModeOfUsingMaps.DRAG && maps && coord?.length) {
      setLoaded(false);

      const resp = maps?.geocode(coord, { kind: 'house' });
      resp
        .then((res: any) => {
          setLoaded(true);
          const geocodeResult: ymaps.GeocodeResult = res.geoObjects.get(0);
          handleChangeAddress({
            address: geocodeResult?.getAddressLine(),
            listOfDistances,
            premiseNumber: geocodeResult?.getPremiseNumber(),
          });
        })
        .catch((error: any) => {
          console.error('The Promise is rejected!', error);
        });
    }
  }, [coord, maps]);

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
          'coordSystem.geo',
          'formatter',
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
          {!loaded && (
            <ReactSVG
              className={style.placemark__preloader}
              src={`${process.env.PUBLIC_URL}/images/find-food/preloader.svg`}
            />
          )}
        </div>

        <Placemark geometry={coord} instanceRef={placemarkRef} options={{ iconOffset: [0, 0], visible: false }} />

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
