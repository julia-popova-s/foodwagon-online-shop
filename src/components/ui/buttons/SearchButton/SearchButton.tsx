import cn from 'classnames';
import { FC } from 'react';

import { ReactComponent as Search } from '../../../../assets/images/search-panel/search.svg';
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
      {icon && icon === 'search' && <Search className={style.searchButton__icon} />}

      <span>{label}</span>
    </button>
  );
};
