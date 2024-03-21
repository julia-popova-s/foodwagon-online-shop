import cn from 'classnames';
import { FC, MouseEvent } from 'react';

import { ReactComponent as Hidden } from '../../../../assets/images/login/hide.svg';
import { ReactComponent as Visible } from '../../../../assets/images/login/see.svg';
import style from './hideButton.module.scss';

type HideButtonProps = {
  classNames?: string;
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
  isHidden: boolean;
};

export const HideButton: FC<HideButtonProps> = ({ classNames, handleClick, isHidden }) => {
  return (
    <button className={cn(classNames, style.regForm__btnHide)} onClick={handleClick}>
      {isHidden ? (
        <Hidden className={style.regForm__btnHideIcon} />
      ) : (
        <Visible className={style.regForm__btnHideIcon} />
      )}
      <div className={style.regForm__btnHideIcon}>{isHidden ? 'Hide' : 'Visible'}</div>
    </button>
  );
};
