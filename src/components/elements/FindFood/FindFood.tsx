import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../../store';
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

  const list = useSelector(restaurantListSelector);
  const placemarks = useSelector(placemarkSelector);
  const coords = useSelector(coordsSelector);
  const address = useSelector(addressSelector);

  useEffect(() => {
    if (list.length) {
      dispatch(setPlacemarks());
    }
  }, [list]);

  const handleSearch = () => {
    setRequestText(searchValue);
  };

  const handleSearchValue = (text: string) => {
    setSearchValue(text);
  };

  const yandexGeocoder = new YandexGeocoder();

  useEffect(() => {
    if (requestText)
      yandexGeocoder.getAddressAndGeopoint(requestText).then((res) => {
        const [lon, lat] = getGeolocationCoordinates(res);
        const address = getExactAddress(res);

        if (address) {
          setRequestText(address);
          dispatch(setLocation({ address, coords: [lat, lon] }));
        }
      });
  }, [requestText]);

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
              <SearchButton classNames={style.search__btn} handleClick={handleSearch} icon="search" label="Find Food" />
            </div>
            <Maps address={address} geolocation={coords} placemarks={placemarks} />
            {/* <Popup isLoaded={isLoaded} isOpen={visiblePopup} list={products} ref={popupRef} /> */}
          </div>
        </div>
      </div>
    </main>
  );
};
