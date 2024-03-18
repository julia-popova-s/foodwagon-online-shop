import cn from 'classnames';
import { FC } from 'react';

import { ReactComponent as User } from '../../../../assets/images/header/user.svg';
import style from './loginButton.module.scss';

type LoginButtonProps = { classNames: string; handleClick: () => void; title: string };

export const LoginButton: FC<LoginButtonProps> = ({ classNames, handleClick, title }) => {
  return (
    <button className={cn(classNames, style.loginButton)} onClick={handleClick}>
      <User className={style.loginButton__icon} />
      <span className={style.loginButton__name}>{title}</span>
    </button>
  );
};
