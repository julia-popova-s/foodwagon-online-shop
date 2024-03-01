import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { FC, KeyboardEvent, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { AddressDetails, Coords, LocationItem } from '../../../store/slices/location/types';
import { restaurantListSelector, setPlacemarks } from '../../../store/slices/restaurants/slice';
import { Status } from '../../../store/utils/getExtraReducers';
import { TextInput } from '../../ui/TextInput';
import { SearchButton } from '../../ui/buttons/SearchButton';
import { Maps } from '../Maps';
import { ModeOfUsingMaps } from '../Maps/Maps';
import { Button, DeliveryMethod } from './DeliveryMethod';
import { Popup } from './Popup';
import style from './findFood.module.scss';

const MemoDeliveryMethod = memo(DeliveryMethod);
const MemoTextInput = memo(TextInput);

export const FindFood: FC = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLUListElement>(null);

  const dispatch = useAppDispatch();

  const list = useSelector(locationListSelector);
  const error = useSelector(errorSelector);
  const status = useSelector(statusSelector);

  const listRest = useSelector(restaurantListSelector);

  const [searchValue, setSearchValue] = useState<Coords | string>('');
  const [visiblePopup, setVisiblePopup] = useState<boolean>(false);
  const [coord, setCoord] = useState<Coords>([30.3515, 59.9497]);
  const [place, setPlace] = useState<string>('');
  const [deliveryStatus, setDeliveryStatus] = useState<boolean>(true);
  const [mode, setMode] = useState<string>('');
  const [premiseNumber, setPremiseNumber] = useState<null | string>('');
  const [addressDetails, setAddressDetails] = useState<AddressDetails[] | undefined>([]);

  const navigate = useNavigate();

  const buttons: Button[] = useMemo(
    () => [
      { icon: '/images/find-food/delivery/delivery.svg', label: 'Delivery' },
      { icon: '/images/find-food/delivery/pickup.svg', label: 'Pickup' },
    ],
    [],
  );

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
      dispatch(
        fetchLocation({
          searchValue,
        }),
      );
      setVisiblePopup(true);
    }
  }, [searchValue]);

  const handleFindFood = () => {
    const houseNumber = addressDetails?.find((el) => el['house']);
    if (houseNumber?.house) {
      setPremiseNumber(houseNumber.house);
      dispatch(setLocation({ address: place, coords: coord, deliveryStatus }));
      // navigate('search');
    }
  };

  const handleSearchValue = (text: string) => {
    setMode(ModeOfUsingMaps.SEARCH);
    setSearchValue(text);
  };

  const handleChangeCoord = useCallback((coords: Coords) => {
    setCoord(coords);
    setSearchValue(coords);
  }, []);

  const handleChangeLocation = useCallback(({ address, addressDetails, coords }: LocationItem) => {
    setMode(ModeOfUsingMaps.SEARCH);
    setAddressDetails(addressDetails);
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
            <MemoDeliveryMethod list={buttons} />
            <div className={style.findFood__search}>
              <div className={style.searchPanel}>
                <MemoTextInput
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
                </MemoTextInput>

                <SearchButton
                  classNames={cn(style.search__btn, {
                    [style.search__btn_inactive]: !premiseNumber && searchValue,
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
                handleChangeCoord={handleChangeCoord}
                handleChangeMode={handleChangeMode}
                handleChangeStatus={handleChangeDeliveryStatus}
                mode={mode}
                place={place}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
