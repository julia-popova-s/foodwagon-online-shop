import cn from 'classnames';
import { FC } from 'react';

import { ReactComponent as Logo } from '../../../assets/images/header/logo.svg';
import style from './logoType.module.scss';

type LogoTypeProps = {
  classNames?: string;
};

export const LogoType: FC<LogoTypeProps> = ({ classNames }) => {
  return (
    <div className={cn(style.logo, classNames)}>
      <Logo className={style.logo__image} />
      <div className={style.logo__name}>food</div>

      <div className={cn(style.logo__name, style.logo__name_color)}>
        <span className={style.logo__nameWa}>wa</span>
        <span className={style.logo__nameG}>G</span>
        <span className={style.logo__nameOn}>on</span>
      </div>
    </div>
  );
};
