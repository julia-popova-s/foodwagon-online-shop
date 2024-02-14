import { faL, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Placemark } from '@pbe/react-yandex-maps';
import cn from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../../store';
import {
  addressSelector,
  fetchLocation,
  isLoadedSelector,
  locationListSelector,
  setLocation,
} from '../../../store/slices/location/slice';
import { placemarkSelector, restaurantListSelector, setPlacemarks } from '../../../store/slices/restaurants/slice';
import { TextInput } from '../../ui/TextInput';
import { SearchButton } from '../../ui/buttons/SearchButton';
import { DeliveryMethod } from './DeliveryMethod';
import { Maps } from './Maps';
import style from './findFood.module.scss';

export const FindFood: FC = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState<string>('');

  const list = useSelector(locationListSelector);
  const address = useSelector(addressSelector);

  const [visiblePopup, setVisiblePopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const isLoaded = useSelector(isLoadedSelector);
  const placemarks = useSelector(placemarkSelector);
  const listRest = useSelector(restaurantListSelector);

  const [place, setPlace] = useState('Saint Petersburg, Shpalernaya Street, 26');
  const [coord, setCoord] = useState([30.35151817345885, 59.94971367493227]);

  useEffect(() => {
    if (listRest.length) {
      dispatch(setPlacemarks());
    }
  }, [listRest]);

  const handleSearch = () => {
    dispatch(setLocation({ address: place, coords: coord }));
  };

  const handleSearchValue = (text: string) => {
    setSearchValue(text);
  };

  const handleChangeCoord = (coord: any) => {
    setCoord(coord);
  };

  const handleChangeAddress = (address: any) => {
    setPlace(address);
  };

  const handleChangeLocation = ({ address, coords }: any) => {
    setPlace(address);
    setCoord(coords);
    setVisiblePopup(false);
  };

  useEffect(() => {
    if (searchValue) {
      dispatch(fetchLocation({ searchValue }));
      setVisiblePopup(true);
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
                address={place}
                classNames={style.searchPanel__input}
                handleSearchValue={handleSearchValue}
                placeholder={'Enter Your Address'}
                ref={searchRef}
              >
                <FontAwesomeIcon className={style.searchPanel__inputIcon} icon={faLocationDot} size="xl" />
              </TextInput>
              <SearchButton classNames={style.search__btn} handleClick={handleSearch} icon="search" label="Find Food" />
            </div>
            {searchValue && (
              <Maps
                coord={coord}
                handleChangeAddress={handleChangeAddress}
                handleChangeCoord={handleChangeCoord}
                place={place}
                placemarks={placemarks}
              />
            )}
            <ul className={cn(style.popup, { [style.hidden]: !visiblePopup })}>
              {list.map((el: any, i: any) => (
                <li key={i} onClick={() => handleChangeLocation(el)}>
                  {' '}
                  {el.address} {el.coords[0]} {el.coords[1]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};
