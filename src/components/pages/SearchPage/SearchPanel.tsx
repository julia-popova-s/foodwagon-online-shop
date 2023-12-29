import { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../../store';
import {
  fetchProductsFastAccess,
  isLoadedSelector,
  productListSelector,
} from '../../../store/slices/productsFastAccess/slice';
import { currentPageSelector, fetchProductsSearch, setCurrentPage } from '../../../store/slices/productsSearch/slice';
import { TextInput } from '../../ui/TextInput';
import { SearchButton } from '../../ui/buttons/SearchButton';
import { Popup } from './Popup';
import style from './searchPanel.module.scss';

export const SearchPanel: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [visiblePopup, setVisiblePopup] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const isLoaded = useSelector(isLoadedSelector);
  const products = useSelector(productListSelector);
  const currentPage = useSelector(currentPageSelector);

  const handleSearchValue = (text: string) => {
    setSearchValue(text);
  };

  const handleSearch = () => {
    dispatch(
      fetchProductsSearch({
        currentPage: 1,
        limit: 8,
        searchValue,
      }),
    );

    dispatch(setCurrentPage(1));
    setVisiblePopup(false);

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (popupRef.current?.contains(e.target as Node) || searchRef.current?.contains(e.target as Node)) {
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
      }),
    );
    dispatch(setCurrentPage(1));
  }, [dispatch, searchValue]);

  useEffect(() => {
    dispatch(
      fetchProductsSearch({
        currentPage,
        limit: 8,
        searchValue,
      }),
    );
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className={style.search}>
      <TextInput handleSearchValue={handleSearchValue} iconUrl={'/images/header/search.svg'} ref={searchRef} />

      <SearchButton classNames={style.search__btn} handleClick={handleSearch} icon="search" label="Find Food" />

      <Popup isLoaded={isLoaded} isOpen={visiblePopup} list={products} ref={popupRef} />
    </div>
  );
};
