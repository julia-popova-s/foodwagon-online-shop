import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import { setPlacemarks } from '../../../store/slices/restaurants/slice';
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

  useEffect(() => {
    if (list.length) {
      dispatch(setPlacemarks());
    }
  }, [list]);

  const handleSearch = () => {};

  const handleSearchValue = (text: string) => {
    setSearchValue(text);
  };

  useEffect(() => {
    if (searchValue) {
      dispatch(fetchLocation({ searchValue }));
    }
  }, [searchValue]);

  const handleChangeLocation = (el: any) => {
    dispatch(setLocation(el));
  };

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
                address={address}
                classNames={style.searchPanel__input}
                handleSearchValue={handleSearchValue}
                placeholder={'Enter Your Address'}
                ref={searchRef}
              >
                <FontAwesomeIcon className={style.searchPanel__inputIcon} icon={faLocationDot} size="xl" />
              </TextInput>
              <SearchButton classNames={style.search__btn} handleClick={handleSearch} icon="search" label="Find Food" />
            </div>
            <Maps />
            <ul>
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
