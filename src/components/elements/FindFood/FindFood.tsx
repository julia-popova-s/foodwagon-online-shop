import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { FC, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
import { AddressProps, ModeOfUsingMaps } from '../Maps/Maps';
import { DeliveryMethod } from './DeliveryMethod';
import { Popup } from './Popup';
import style from './findFood.module.scss';

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
  const [premiseNumber, setPremiseNumber] = useState<null | string>('');
  const [streetName, setStreetName] = useState<null | string>('');

  const navigate = useNavigate();

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
    if (searchValue) {
      dispatch(fetchLocation({ searchValue: searchValue.replace(';', '%3B') }));
      setVisiblePopup(true);
    }
  }, [searchValue]);

  const handleFindFood = () => {
    if (premiseNumber && streetName) {
      dispatch(setLocation({ address: place, coords: coord, deliveryStatus }));
      navigate('search');
    }
  };
  const handleSearchValue = (text: string) => {
    setMode(ModeOfUsingMaps.SEARCH);
    setSearchValue(text);
  };

  const handleChangeCoord = useCallback((coords: Coords) => {
    setCoord(coords);
  }, []);

  const handleChangeAddress = useCallback(({ address, premiseNumber, streetName }: AddressProps) => {
    setPlace(address);
    setStreetName(streetName);
    setPremiseNumber(premiseNumber);
  }, []);

  const handleChangeLocation = useCallback(({ address, coords }: LocationItem) => {
    setMode(ModeOfUsingMaps.SEARCH);
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
      setMode(ModeOfUsingMaps.SEARCH);
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
                  {status === Status.LOADING && searchValue && (
                    <div className={style.searchPanel__inputLoader}>
                      <ReactSVG src={`${process.env.PUBLIC_URL}/images/find-food/preloader.svg`} />
                    </div>
                  )}
                </TextInput>

                <SearchButton
                  classNames={cn(style.search__btn, {
                    [style.search__btn_inactive]: !(premiseNumber && streetName) && searchValue,
                  })}
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
