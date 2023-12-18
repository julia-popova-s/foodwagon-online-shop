import cn from 'classnames';
import { FC, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { ProductOrderType, ProductSortingType } from '../../../store/slices/filters/types';
import { RestaurantOrderType, RestaurantSortingType } from '../../../store/slices/sortingType/types';
import style from './sortPopup.module.scss';

export type SortType = ProductSortingType | RestaurantSortingType;
export type OrderType = ProductOrderType | RestaurantOrderType;

export type SortItem = {
  name: string;
  order: OrderType;
  type: SortType;
};

type SortPopupProps = {
  activeSortType: SortType;
  classNames?: string;
  handleChangeSortType: (sortType: SortType, orderType: OrderType) => void;
  items: SortItem[];
  orderType: OrderType;
};

export const SortPopup: FC<SortPopupProps> = ({
  activeSortType,
  classNames,
  handleChangeSortType,
  items,
  orderType,
}) => {
  const [visiblePopup, setVisiblePopup] = useState<boolean>(false);

  const handleOpenPopup = () => {
    setVisiblePopup(true);
  };

  const handleClosePopup = () => {
    setVisiblePopup(false);
  };

  const sortRef = useOutsideClick(handleClosePopup);

  const activeLabel = items?.find((obj) => obj.type === activeSortType)?.name;

  return (
    <div className={cn(style.sort, classNames)}>
      <div className={style.sort__title} ref={sortRef}>
        sort by
        <span className={style.sort__link} onClick={handleOpenPopup}>
          {activeLabel}
        </span>
      </div>
      <CSSTransition classNames="alert" in={visiblePopup} timeout={300} unmountOnExit>
        <div className={style.sort__popup}>
          <ul className={style.sort__list} onClick={handleClosePopup}>
            {items?.map(({ name, order, type }, i) => {
              return (
                <li
                  className={cn(style.sort__item, {
                    [style.sort__item_active]: type === activeSortType && order === orderType,
                  })}
                  key={`${type}_${i}`}
                  onClick={() => handleChangeSortType(type, order)}
                >
                  {name}
                </li>
              );
            })}
          </ul>
        </div>
      </CSSTransition>
    </div>
  );
};
