import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { emailSelector } from '../../../store/reducers/user';
import style from './modal.module.scss';

export const Modal = forwardRef(({ handleCloseModal, name, orderNumber, show }, ref) => {
  const email = useSelector(emailSelector);
  return (
    <CSSTransition classNames="alert" in={show} timeout={300} unmountOnExit>
      <div className={style.popupWrapper} ref={ref}>
        <div className={style.popup}>
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
