import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';

import { ButtonFind } from '../../ui/ButtonFind';
import { TextInput } from '../../ui/TextInput';
import { Delivery } from './Delivery';
import style from './findFood.module.scss';

export function FindFood() {
  const searchRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchValue = text => {
    setSearchValue(text);
  };
  return (
    <div className={style.findFoodWrapper}>
      <div className="container">
        <div className={style.findFood}>
          <h1 className={style.findFood__title}>Are you starving?</h1>
          <p className={style.findFood__text}>Within a few clicks, find meals that are accessible near you</p>
          <div className={style.findFood__search}>
            <Delivery />
            <div className={style.searchPanel}>
              <TextInput classNames={style.searchPanel__input} handleSearchValue={handleSearchValue} ref={searchRef}>
                <FontAwesomeIcon className={style.searchPanel__inputIcon} icon={faLocationDot} size="xl" />
              </TextInput>
              <ButtonFind classNames={style.search__btn} icon="search" label="Find Food" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
