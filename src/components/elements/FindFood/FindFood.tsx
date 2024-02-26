import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { useAppDispatch } from '../../../store';
import {
  errorSelector,
  fetchLocation,
  locationListSelector,
  setLocation,
  statusSelector,
} from '../../../store/slices/location/slice';
import { Coords, LocationItem } from '../../../store/slices/location/types';
import { placemarkSelector, restaurantListSelector, setPlacemarks } from '../../../store/slices/restaurants/slice';
import { Status } from '../../../store/utils/getExtraReducers';
import { TextInput } from '../../ui/TextInput';
import { SearchButton } from '../../ui/buttons/SearchButton';
import { Maps } from '../Maps';
import { DeliveryMethod } from './DeliveryMethod';
import { Popup } from './Popup';
import style from './findFood.module.scss';

export enum ModeOfUsingMaps {
  INPUT = 'input',
  MAPS = 'maps',
}

export const FindFood: FC = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLUListElement>(null);

  const dispatch = useAppDispatch();

  const list = useSelector(locationListSelector);
  const error = useSelector(errorSelector);
  const status = useSelector(statusSelector);

  const placemarks = useSelector(placemarkSelector);
  const listRest = useSelector(restaurantListSelector);

  const [searchValue, setSearchValue] = useState<string>('');
  const [visiblePopup, setVisiblePopup] = useState<boolean>(false);
  const [coord, setCoord] = useState<Coords>([30.3515, 59.9497]);
  const [place, setPlace] = useState<string>('');
  const [deliveryStatus, setDeliveryStatus] = useState<boolean>(true);
  const [mode, setMode] = useState<string>('');

  // const navigate = useNavigate();

  useEffect(() => {
    if (listRest.length) {
      dispatch(setPlacemarks());
    }
  }, [listRest]);

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

  useEffect(() => {
    if (searchValue && mode === ModeOfUsingMaps.INPUT) {
      dispatch(fetchLocation({ searchValue: searchValue.replace(';', '%3B') }));
      setVisiblePopup(true);
    }
  }, [searchValue]);

  const handleFindFood = () => {
    dispatch(setLocation({ address: place, coords: coord, deliveryStatus }));
    // navigate('search');
  };

  const handleSearchValue = (text: string) => {
    setMode(ModeOfUsingMaps.INPUT);
    setSearchValue(text);
  };

  const handleChangeCoord = useCallback((coords: Coords) => {
    setCoord(coords);
  }, []);

  const handleChangeAddress = useCallback((address: string) => {
    setPlace(address);
  }, []);

  const handleChangeLocation = useCallback(({ address, coords }: LocationItem) => {
    setMode(ModeOfUsingMaps.INPUT);
    setPlace(address);
    setCoord(coords);
    setVisiblePopup(false);
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (popupRef.current && event.key === 'ArrowDown') {
      event.preventDefault();
      popupRef.current?.focus();
    }

    if (event.key === 'Enter' && list.length) {
      event.preventDefault();
      handleChangeLocation(list[0]);
      setMode(ModeOfUsingMaps.INPUT);
    }
  };

  const handlePopupVisibility = useCallback((status: boolean) => {
    setVisiblePopup(status);
  }, []);

  const handleChangeDeliveryStatus = useCallback((status: boolean) => {
    setDeliveryStatus(status);
  }, []);

  const handleChangeMode = useCallback((mode: string) => {
    setMode(mode);
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

                {status === Status.LOADING && searchValue ? (
                  <div className={style.searchPanel__loader}>
                    <ReactSVG src={`${process.env.PUBLIC_URL}/images/find-food/search-panel/loader.svg`} />
                  </div>
                ) : null}

                <SearchButton
                  classNames={style.search__btn}
                  handleClick={handleFindFood}
                  icon="search"
                  label="Find Food"
                />
              </div>

              <Popup
                errorMessage={error}
                handleChangeLocation={handleChangeLocation}
                handleChangeStatus={handlePopupVisibility}
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
                handleChangeMode={handleChangeMode}
                handleChangeStatus={handleChangeDeliveryStatus}
                mode={mode}
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
