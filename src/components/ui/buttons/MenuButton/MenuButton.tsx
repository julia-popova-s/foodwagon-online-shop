import cn from 'classnames';
import { FC } from 'react';

import style from './menuButton.module.scss';

type MenuButtonProps = {
  handleClick: () => void;
  isVisible: boolean;
};

export const MenuButton: FC<MenuButtonProps> = ({ handleClick, isVisible }) => {
  return (
    <button
      className={cn(style.menuButton, {
        [style.buttonClose]: isVisible,
      })}
      onClick={handleClick}
    >
      <div className={cn(style.menuButton__border, style.menuButton__border_top)}></div>
      <div className={cn(style.menuButton__border, style.menuButton__border_center)}></div>
      <div className={cn(style.menuButton__border, style.menuButton__border_bottom)}></div>
    </button>
  );
};
