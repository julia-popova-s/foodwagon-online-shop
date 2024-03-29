import cn from 'classnames';
import { KeyboardEvent, forwardRef, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';

import { LocationItem } from '../../../store/slices/location/types';
import style from './listPopup.module.scss';

type ListPopupProps = {
  errorMessage?: null | string;
  handleLocationChange: (el: LocationItem) => void;
  handleStatusChange: (status: boolean) => void;
  isOpen: boolean;
  list: LocationItem[];
};

export const ListPopup = forwardRef<HTMLUListElement, ListPopupProps>(
  ({ errorMessage, handleLocationChange, handleStatusChange, isOpen, list }, ref) => {
    const buttonRef = useRef<HTMLLIElement>(null);
    const [activeIndex, setActiveIndex] = useState<number>(-1);

    const handleListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex((prevIndex) => {
          if (list && prevIndex < list.length - 1) {
            return prevIndex + 1;
          }
          return 0;
        });
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();

        setActiveIndex((prevIndex) => {
          if (list && prevIndex > 0) {
            return prevIndex - 1;
          }
          return 0;
        });
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        handleStatusChange(false);
        setActiveIndex(-1);
      }
    };

    const handleButtonKeyDown = (event: KeyboardEvent<HTMLLIElement>, el: any) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleLocationChange(el);
        setActiveIndex(-1);
      }
    };

    useEffect(() => {
      buttonRef.current?.focus();
    }, [activeIndex]);

    return (
      <CSSTransition classNames="alert" in={isOpen} timeout={300} unmountOnExit>
        <ul className={style.popup} onKeyDown={handleListKeyDown} ref={ref} tabIndex={0}>
          {list.map((el: LocationItem, index) => {
            return (
              <li
                className={cn(style.popup__item, {
                  [style.popup__item__active]: index === activeIndex,
                })}
                key={uuidv4()}
                onClick={() => handleLocationChange(el)}
                onKeyDown={(e) => handleButtonKeyDown(e, el)}
                ref={index === activeIndex ? buttonRef : undefined}
                tabIndex={0}
              >
                {el.address}
              </li>
            );
          })}
          {errorMessage && <div className={style.popup__errorMessage}>{errorMessage}</div>}
        </ul>
      </CSSTransition>
    );
  },
);
