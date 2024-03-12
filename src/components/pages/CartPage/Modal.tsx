import { forwardRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { useAppSelector } from '../../../store';
import { emailSelector } from '../../../store/slices/user/slice';
import style from './modal.module.scss';

type ModalProps = {
  handleCloseModal: () => void;
  isOpen: boolean;
  name: string;
  orderNumber: number;
};

export const Modal = forwardRef<HTMLDivElement, ModalProps>(({ handleCloseModal, isOpen, name, orderNumber }, ref) => {
  const email = useAppSelector(emailSelector);
  
  return (
    <CSSTransition classNames="alert" in={isOpen} timeout={300} unmountOnExit>
      <div className={style.popupWrapper}>
        <div className={style.popup} ref={ref}>
          <div className={style.popup__title}>
            <span className={style.popup__name}>
              Order №{orderNumber} from restaurant «{name}» was created, user: {email}
            </span>
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
});
