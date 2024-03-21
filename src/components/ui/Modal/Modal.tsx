import { forwardRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import style from './modal.module.scss';

type ModalProps = {
  email: string;
  handleCloseModal: () => void;
  isOpen: boolean;
  name: string;
  orderNumber: number;
};

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ email, handleCloseModal, isOpen, name, orderNumber }, ref) => {
    return (
      <CSSTransition classNames="alert" in={isOpen} timeout={300} unmountOnExit>
        <div className={style.popupWrapper}>
          <div className={style.popup} ref={ref}>
            <div className={style.popup__title}>
              <p className={style.popup__name}>
                Order № {orderNumber} created from «{name}» restaurant
              </p>
              <p className={style.popup__name}>user: {email}</p>
            </div>

            <div className={style.popup__btns}>
              <button className={style.popup__btnClose} onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </CSSTransition>
    );
  },
);
