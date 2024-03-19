import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { FC, KeyboardEvent, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as Spinner } from '../../../assets/images/search-panel/spinner.svg';
import { useAppDispatch, useAppSelector } from '../../../store';
import {
  errorSelector,
  fetchLocation,
  locationListSelector,
  setDeliveryType,
  setLocation,
  statusSelector,
} from '../../../store/slices/location/slice';
import { Coords, DeliveryStatus, DeliveryType, DistanceItem, LocationItem } from '../../../store/slices/location/types';
import { Status } from '../../../store/utils/getExtraReducers';
import { TextInput } from '../../ui/TextInput';
import { SearchButton } from '../../ui/buttons/SearchButton';
import { Maps } from '../Maps';
import { ExtendedAddress, ModeOfUsingMaps } from '../Maps/Maps';
import { Button, DeliveryMethod } from './DeliveryMethod';
import { Popup } from './Popup';
import style from './findFood.module.scss';

const MemoDeliveryMethod = memo(DeliveryMethod);

export const FindFood: FC = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLUListElement>(null);

  const dispatch = useAppDispatch();

  const list = useAppSelector(locationListSelector);
  const error = useAppSelector(errorSelector);
  const status = useAppSelector(statusSelector);

  const [listOfDistances, setListOfDistances] = useState<DistanceItem[]>([]);
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus>();
  const [premiseNumber, setPremiseNumber] = useState<null | string>();
  const [searchValue, setSearchValue] = useState<Coords | string>('');
  const [visiblePopup, setVisiblePopup] = useState<boolean>(false);
  const [coord, setCoord] = useState<Coords>([30.3515, 59.9497]);
  const [activeType, setActiveType] = useState<DeliveryType>(DeliveryType.DELIVERY);
  const [place, setPlace] = useState<string>('');
  const [mode, setMode] = useState<string>('');
  const [isVisibleMap, setIsVisibleMap] = useState(false);

  const navigate = useNavigate();

  const buttons: Button[] = useMemo(() => [{ label: DeliveryType.DELIVERY }, { label: DeliveryType.PICKUP }], []);

  useEffect(() => {
    if (mode === ModeOfUsingMaps.SEARCH) {
      setIsVisibleMap(true);
    }
  }, [mode]);

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
    if (searchValue && mode === ModeOfUsingMaps.SEARCH) {
      dispatch(
        fetchLocation({
          searchValue,
        }),
      );
      setVisiblePopup(true);
    }
  }, [searchValue]);

  const setDeliveryAddress = (item: LocationItem) => {
    dispatch(setLocation(item));
    navigate('restaurant');
  };

  const handleFindFood = () => {
    const item: LocationItem = {
      address: place,
      coords: coord,
      deliveryStatus,
      deliveryType: activeType,
      listOfDistances,
    };

    if (premiseNumber) {
      setDeliveryAddress(item);
    }
  };

  const handleSearchValue = useCallback((text: string) => {
    setMode(ModeOfUsingMaps.SEARCH);
    setSearchValue(text);
  }, []);

  const handleChangeCoord = useCallback((coords: Coords) => {
    setCoord(coords);
    setSearchValue(coords);
  }, []);

  const handleChangeLocation = useCallback(({ address, addressDetails, coords }: LocationItem) => {
    const premiseNumber = addressDetails?.find((el) => el['house'])?.house;
    setMode(ModeOfUsingMaps.SEARCH);
    setPremiseNumber(premiseNumber);
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

  const handleChangeDeliveryStatus = useCallback((status: DeliveryStatus) => {
    setDeliveryStatus(status);
  }, []);

  const handleChangeMode = useCallback((mode: string) => {
    setMode(mode);
  }, []);

  const handleChangeAddress = useCallback(({ address, listOfDistances, premiseNumber }: ExtendedAddress) => {
    setPlace(address);
    setPremiseNumber(premiseNumber);
    setListOfDistances(listOfDistances);
  }, []);

  const handleChangeDeliveryType = useCallback((label: DeliveryType) => {
    setActiveType(label);
    dispatch(setDeliveryType(label));
  }, []);

  return (
    <main className={style.findFoodWrapper}>
      <div className="container">
        <div className={style.findFood}>
          <h1 className={style.findFood__title}>Are you starving?</h1>
          <p className={style.findFood__text}>Within a few clicks, find meals that are accessible near you</p>

          <div className={style.findFood__searchPanel}>
            <MemoDeliveryMethod handleChangeDeliveryType={handleChangeDeliveryType} list={buttons} />
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
                      <Spinner />
                    </div>
                  )}
                </TextInput>

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

            {isVisibleMap && (
              <Maps
                coord={coord}
                handleChangeAddress={handleChangeAddress}
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
