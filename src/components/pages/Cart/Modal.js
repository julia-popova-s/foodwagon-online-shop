import { forwardRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import style from './modal.module.scss';

export const Modal = forwardRef(({ handleCloseModal, idOrder, name, show }, ref) => {
  return (
    <CSSTransition classNames="alert" in={show} timeout={300} unmountOnExit>
      <div className={style.popupWrapper} ref={ref}>
        <div className={style.popup}>
          <div className={style.popup__title}>
            <span className={style.popup__name}>
              {/* «{name}». Order №{idOrder++} */}
              Order №{idOrder} from «{name}» restaurant is completed!
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
