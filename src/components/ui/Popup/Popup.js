import { forwardRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import style from './popup.module.scss';

export const Popup = forwardRef(({ handleClearOrder, handleClosePopup, name, show }, ref) => {
  return (
    <CSSTransition classNames="alert" in={show} timeout={300} unmountOnExit>
      <div className={style.popupWrapper} ref={ref}>
        <div className={style.popup}>
          <div className={style.popup__title}>
            Are you sure you want to empty the cart from{' '}
            <span className={style.popup__name}>«{name}»</span>?
          </div>
          <div className={style.popup__btns}>
            <button className={style.popup__btnOk} onClick={handleClearOrder}>
              Ok
            </button>
            <button className={style.popup__btnClose} onClick={handleClosePopup}>
              Close
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
});
