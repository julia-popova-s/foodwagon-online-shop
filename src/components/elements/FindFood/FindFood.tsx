import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../../store';
import { fetchLocation, isLoadedSelector, locationListSelector } from '../../../store/slices/location/slice';
import {
  addressSelector,
  coordsSelector,
  placemarkSelector,
  restaurantListSelector,
  setLocation,
  setPlacemarks,
} from '../../../store/slices/restaurants/slice';
import { getExactAddress } from '../../../utils/getAddress';
import { getGeolocationCoordinates } from '../../../utils/getGeolocationCoordinates';
import { Popup } from '../../pages/SearchPage/Popup';
import { TextInput } from '../../ui/TextInput';
import { SearchButton } from '../../ui/buttons/SearchButton';
import { DeliveryMethod } from './DeliveryMethod';
import { Maps } from './Maps';
import { YandexGeocoder } from './YandexGeocoder';
import style from './findFood.module.scss';

export const FindFood: FC = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState<string>('');
  const [requestText, setRequestText] = useState<string>('');

  const list = useSelector(locationListSelector);
  const placemarks = useSelector(placemarkSelector);
  const coords = useSelector(coordsSelector);
  const address = useSelector(addressSelector);
  console.log(list);

  const [visiblePopup, setVisiblePopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const isLoaded = useSelector(isLoadedSelector);
  console.log(isLoaded);
  console.log(visiblePopup);

  useEffect(() => {
    if (list.length) {
      dispatch(setPlacemarks());
    }
  }, [list]);

  // const handleSearch = () => {
  //   setRequestText(searchValue);
  // };

  const handleSearchValue = (text: string) => {
    setSearchValue(text);
  };

  // console.log(searchValue);

  useEffect(() => {
    if (searchValue) {
      dispatch(fetchLocation({ searchValue }));
    }
  }, [searchValue]);

  return (
    <main className={style.findFoodWrapper}>
      <div className="container">
        <div className={style.findFood}>
          <h1 className={style.findFood__title}>Are you starving?</h1>
          <p className={style.findFood__text}>Within a few clicks, find meals that are accessible near you</p>

          <div className={style.findFood__search}>
            <DeliveryMethod />

            <div className={style.searchPanel}>
              <TextInput
                classNames={style.searchPanel__input}
                handleSearchValue={handleSearchValue}
                placeholder={'Enter Your Address'}
                ref={searchRef}
              >
                <FontAwesomeIcon className={style.searchPanel__inputIcon} icon={faLocationDot} size="xl" />
              </TextInput>
              <SearchButton
                classNames={style.search__btn}
                // handleClick={handleSearch}
                icon="search"
                label="Find Food"
              />
            </div>
            <Maps placemarks={placemarks} requestText={requestText} />
            {/* <Popup isLoaded={isLoaded} isOpen={visiblePopup} list={list} ref={popupRef} /> */}
            {list.map((el: any) => (
              <div>
                {el.address} {el.coords}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
