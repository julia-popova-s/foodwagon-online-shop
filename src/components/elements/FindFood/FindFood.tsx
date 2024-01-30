import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useEffect, useRef, useState } from 'react';

import { getGeolocationCoordinates } from '../../../utils/getGeolocationCoordinates';
import { TextInput } from '../../ui/TextInput';
import { SearchButton } from '../../ui/buttons/SearchButton';
import { DeliveryMethod } from './DeliveryMethod';
import { Maps } from './Maps';
import { YandexGeocoder } from './YandexGeocoder';
import style from './findFood.module.scss';

export const FindFood: FC = () => {
  const searchRef = useRef<HTMLDivElement>(null);

  const [searchValue, setSearchValue] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [geolocation, setGeolocation] = useState([59.94971367493227, 30.35151817345885]);

  const handleSearch = () => {
    setAddress(searchValue);
  };

  const handleSearchValue = (text: string) => {
    setSearchValue(text);
  };
  // const address = 'Дубай, бульвар Мухаммед Бин Рашид, дом 1';
  const yandexGeocoder = new YandexGeocoder();

  useEffect(() => {
    if (address)
      yandexGeocoder.getAddressToGeopoint(address).then((res) => {
        const [lon, lat] = getGeolocationCoordinates(res);
        setGeolocation([lat, lon]);
      });
  }, [address]);
  return (
    <main className={style.findFoodWrapper}>
      <div className="container">
        <div className={style.findFood}>
          <h1 className={style.findFood__title}>Are you starving?</h1>
          <p className={style.findFood__text}>Within a few clicks, find meals that are accessible near you</p>

          <div className={style.findFood__search}>
            <DeliveryMethod />

            <div className={style.searchPanel}>
              <TextInput classNames={style.searchPanel__input} handleSearchValue={handleSearchValue} ref={searchRef}>
                <FontAwesomeIcon className={style.searchPanel__inputIcon} icon={faLocationDot} size="xl" />
              </TextInput>
              <SearchButton classNames={style.search__btn} handleClick={handleSearch} icon="search" label="Find Food" />
            </div>
            <Maps address={address} geolocation={geolocation} />
          </div>
        </div>
      </div>
    </main>
  );
};
