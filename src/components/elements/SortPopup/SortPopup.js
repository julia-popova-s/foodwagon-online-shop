import cn from 'classnames';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import React from 'react';

import style from './sortPopup.module.scss';
// let render = 0

export function SortPopup({ activeSortType, classNames, handleClickSortType, items, orderType }) {
  // console.log('render SortPopup', ++render)
  const [visiblePopup, setVisiblePopup] = useState(false);
  const sortRef = useRef();

  const activeLabel = items.find((obj) => obj.type === activeSortType).name;

  const handleVisiblePopup = () => {
    setVisiblePopup(!visiblePopup);
  };

  const handleSelectFilter = (type, order) => {
    handleClickSortType(type, order);
    // activeLabel = items[index].name
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!sortRef.current?.contains(e.target)) {
        setVisiblePopup(false);
      }
    };
    document.body.addEventListener('click', handleOutsideClick);

    return () => document.body.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div className={cn(style.sort, classNames)}>
      <div className={style.sort__title} ref={sortRef}>
        sort by
        <span className={style.sort__link} onClick={handleVisiblePopup}>
          {activeLabel}
        </span>
      </div>
      {visiblePopup && (
        <div className={style.sort__popup}>
          <ul className={style.sort__list}>
            {items &&
              items.map(({ name, order, type }, i) => {
                return (
                  <li
                    className={cn(style.sort__item, {
                      [style.sort__item_active]: type === activeSortType && order === orderType,
                    })}
                    key={`${type}_${i}`}
                    onClick={() => handleSelectFilter(type, order)}
                  >
                    {name}
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
}
SortPopup.propTypes = {
  activeSortType: PropTypes.string.isRequired,
  handleClickSortType: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

SortPopup.defaultProps = {
  items: [],
};
