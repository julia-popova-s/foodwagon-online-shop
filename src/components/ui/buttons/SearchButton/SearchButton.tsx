import cn from 'classnames';
import { FC } from 'react';
import { ReactSVG } from 'react-svg';

import style from './searchButton.module.scss';

type SearchButtonProps = {
  classNames: string;
  handleClick?: () => void;
  icon?: string;
  label: string;
};

export const SearchButton: FC<SearchButtonProps> = ({ classNames, handleClick, icon, label }) => {
  return (
    <button className={cn(style.searchButton, classNames)} onClick={handleClick}>
      {icon && icon === 'search' && (
        <ReactSVG
          className={style.searchButton__icon}
          src={`${process.env.PUBLIC_URL}/images/find-food/search-panel/search.svg`}
          wrapper="span"
        />
      )}

      <span>{label}</span>
    </button>
  );
};
