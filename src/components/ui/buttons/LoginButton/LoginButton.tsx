import cn from 'classnames';
import { ReactSVG } from 'react-svg';

import style from './loginButton.module.scss';

export function LoginButton({ classNames, handleClick, title }) {
  return (
    <button className={cn(classNames, style.loginButton)} onClick={handleClick}>
      <ReactSVG
        className={style.loginButton__icon}
        src={`${process.env.PUBLIC_URL}/images/header/user.svg`}
        wrapper="span"
      />

      <span className={style.loginButton__name}>{title}</span>
    </button>
  );
}
