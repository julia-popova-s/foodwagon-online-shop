import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../store';
import {
  fetchLocation,
  isLoadedSelector,
  locationListSelector,
  setLocation,
} from '../../../store/slices/location/slice';
import { Coords, LocationItem } from '../../../store/slices/location/types';
import { placemarkSelector, restaurantListSelector, setPlacemarks } from '../../../store/slices/restaurants/slice';
import { TextInput } from '../../ui/TextInput';
import { SearchButton } from '../../ui/buttons/SearchButton';
import { Maps } from '../Maps';
import { DeliveryMethod } from './DeliveryMethod';
import { Popup } from './Popup';
import style from './findFood.module.scss';

export const FindFood: FC = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLUListElement>(null);

  const dispatch = useAppDispatch();

  const list = useSelector(locationListSelector);
  const isLoaded = useSelector(isLoadedSelector);
  const placemarks = useSelector(placemarkSelector);
  const listRest = useSelector(restaurantListSelector);

  const [searchValue, setSearchValue] = useState<string>('');
  const [visiblePopup, setVisiblePopup] = useState<boolean>(false);
  const [coord, setCoord] = useState<Coords>([30.3515, 59.9497]);
  const [place, setPlace] = useState<string>('');
  const [deliveryStatus, setDeliveryStatus] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (listRest.length) {
      dispatch(setPlacemarks());
    }
  }, [listRest]);

  const handleSearch = () => {
    dispatch(setLocation({ address: place, coords: coord, status: deliveryStatus }));
    navigate('search');
  };

  const handleSearchValue = (text: string) => {
    setSearchValue(text);
  };

  const handleChangeCoord = useCallback((coord: Coords) => {
    setCoord(coord);
  }, []);

  const handleChangeAddress = useCallback((address: string) => {
    setPlace(address);
  }, []);

  const handleChangeLocation = useCallback(({ address, coords }: LocationItem) => {
    handleChangeAddress(address);
    handleChangeCoord(coords);
    setVisiblePopup(false);
  }, []);

  useEffect(() => {
    if (searchValue) {
      dispatch(fetchLocation({ searchValue }));
      setVisiblePopup(true);
    }
  }, [searchValue]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (popupRef.current && event.key === 'ArrowDown') {
      event.preventDefault();
      popupRef.current?.focus();
    }

    if (event.key === 'Enter' && list.length) {
      event.preventDefault();
      handleChangeLocation(list[0]);
    }
  };

  const handleChangeStatus = useCallback((status: boolean) => {
    setVisiblePopup(status);
  }, []);

  const handleChangeDeliveryStatus = useCallback((status: boolean) => {
    setDeliveryStatus(status);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (popupRef.current?.contains(e.target as Node) || searchRef.current?.contains(e.target as Node)) {
        setVisiblePopup(true);
      } else {
        setVisiblePopup(false);
      }
      return;
    };

    document.body.addEventListener('mousedown', handleOutsideClick);

    return () => document.body.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <main className={style.findFoodWrapper}>
      <div className="container">
        <div className={style.findFood}>
          <h1 className={style.findFood__title}>Are you starving?</h1>
          <p className={style.findFood__text}>Within a few clicks, find meals that are accessible near you</p>

          <div className={style.findFood__searchPanel}>
            <DeliveryMethod />
            <div className={style.findFood__search}>
              <div className={style.searchPanel}>
                <TextInput
                  address={place}
                  classNames={style.searchPanel__input}
                  handleKeyDown={handleKeyDown}
                  handleSearchValue={handleSearchValue}
                  placeholder={'Enter Your Address'}
                  ref={searchRef}
                >
                  <FontAwesomeIcon className={style.searchPanel__inputIcon} icon={faLocationDot} size="xl" />
                </TextInput>
                <SearchButton
                  classNames={style.search__btn}
                  handleClick={handleSearch}
                  icon="search"
                  label="Find Food"
                />
              </div>

              <Popup
                handleChangeLocation={handleChangeLocation}
                handleChangeStatus={handleChangeStatus}
                isLoaded={isLoaded}
                isOpen={visiblePopup}
                list={list}
                ref={popupRef}
              />
            </div>

            {place && (
              <Maps
                coord={coord}
                handleChangeAddress={handleChangeAddress}
                handleChangeCoord={handleChangeCoord}
                handleChangeStatus={handleChangeDeliveryStatus}
                place={place}
                placemarks={placemarks}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
