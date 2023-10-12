import style from './popup.module.scss'
import { CSSTransition } from 'react-transition-group'

export function Popup({ show, name }) {
  return (
    <CSSTransition classNames="alert" in={show} timeout={2000} unmountOnExit>
      <div className={style.popupWrapper}>
        <div className={style.popup}>
          <div>Are you sure you want to empty the cart from «{name}» restaurant?</div>
          <button>Ok</button>
          <button>Close</button>
        </div>
      </div>
    </CSSTransition>
  )
}
