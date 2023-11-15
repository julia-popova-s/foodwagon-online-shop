// import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchProductsFastAccess,
  isLoadedSelector,
  productListSelector,
} from '../../../store/reducers/productsFastAccess';
import {
  currentPageSelector,
  fetchProductsSearch,
  setCurrentPage,
} from '../../../store/reducers/productsSearch';
import { ButtonFind } from '../../ui/ButtonFind';
import { TextInput } from '../../ui/TextInput';
import { Popup } from './Popup';
import style from './searchPanel.module.scss';

export function SearchPanel() {
  const [searchValue, setSearchValue] = useState('');
  const [visiblePopup, setVisiblePopup] = useState(false);

  const popupRef = useRef(null);
  const searchRef = useRef(null);

  const dispatch = useDispatch();

  const isLoaded = useSelector(isLoadedSelector);
  const products = useSelector(productListSelector);
  const currentPage = useSelector(currentPageSelector);

  const handleSearchValue = (text) => {
    setSearchValue(text);
  };

  const handleSearch = () => {
    dispatch(
      fetchProductsSearch({
        currentPage: 1,
        limit: 8,
        searchValue,
      })
    );
    dispatch(setCurrentPage(1));
    setVisiblePopup(false);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (popupRef.current?.contains(e.target) || searchRef.current?.contains(e.target)) {
        setVisiblePopup(true);
      } else {
        setVisiblePopup(false);
      }
      return;
    };
    document.body.addEventListener('click', handleOutsideClick);

    return () => document.body.removeEventListener('click', handleOutsideClick);
  }, []);

  useEffect(() => {
    dispatch(
      fetchProductsFastAccess({
        currentPage: 1,
        limit: 4,
        searchValue,
      })
    );
    dispatch(setCurrentPage(1));
  }, [dispatch, searchValue]);

  useEffect(() => {
    dispatch(
      fetchProductsSearch({
        currentPage,
        limit: 8,
        searchValue,
      })
    );
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className={style.search}>
      <TextInput
        handleSearchValue={handleSearchValue}
        iconUrl={'/images/header/search.svg'}
        ref={searchRef}
      ></TextInput>
      <ButtonFind
        classNames={style.search__btn}
        handleClick={handleSearch}
        icon="search"
        label="Find Food"
      />
      <Popup isLoaded={isLoaded} list={products} ref={popupRef} show={visiblePopup} />
    </div>
  );
}
