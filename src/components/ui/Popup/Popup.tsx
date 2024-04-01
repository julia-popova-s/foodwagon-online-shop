import { PropsWithChildren, forwardRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import style from './popup.module.scss';

type PopupProps = {
  handleClose: () => void;
  handleOk: (id: string) => void;
  id: string;
  isOpen: boolean;
};

export const Popup = forwardRef<HTMLDivElement, PropsWithChildren<PopupProps>>(
  ({ children, handleClose, handleOk, id, isOpen }, ref) => {
    return (
      <CSSTransition classNames="alert" in={isOpen} timeout={300} unmountOnExit>
        <div className={style.popupWrapper}>
          <div className={style.popup} ref={ref}>
            <div className={style.popup__title}>{children}</div>

            <div className={style.popup__btns}>
              <button className={style.popup__btnOk} onClick={() => handleOk(id)}>
                Ok
              </button>

              <button className={style.popup__btnClose} onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </CSSTransition>
    );
  },
);
