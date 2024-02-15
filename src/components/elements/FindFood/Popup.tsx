import classNames from 'classnames';
import { KeyboardEvent, forwardRef, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';

import style from './popup.module.scss';

type PopupProps = {
  handleChangeLocation: (el: any) => void;
  handleChangeStatus: (status: boolean) => void;
  isLoaded: boolean;
  isOpen: boolean;
  list: string[];
};

export const Popup = forwardRef<HTMLUListElement, PopupProps>(
  ({ handleChangeLocation, handleChangeStatus, isLoaded, isOpen, list }, ref) => {
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
        handleChangeStatus(false);
        setActiveIndex(-1);
      }
    };

    const handleButtonKeyDown = (event: KeyboardEvent<HTMLLIElement>, el: any) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleChangeLocation(el);
        setActiveIndex(-1);
      }
    };

    useEffect(() => {
      buttonRef.current?.focus();
    }, [activeIndex]);

    return (
      <CSSTransition classNames="alert" in={isOpen && isLoaded} timeout={300} unmountOnExit>
        <ul className={style.popup} onKeyDown={handleListKeyDown} ref={ref} tabIndex={0}>
          {list.map((el: any, index) => {
            return (
              <li
                className={classNames(style.popup__item, {
                  [style.popup__item__active]: index === activeIndex,
                })}
                key={uuidv4()}
                onClick={() => handleChangeLocation(el)}
                onKeyDown={(e) => handleButtonKeyDown(e, el)}
                ref={index === activeIndex ? buttonRef : undefined}
                tabIndex={0}
              >
                {el.address}
              </li>
            );
          })}
        </ul>
      </CSSTransition>
    );
  },
);
