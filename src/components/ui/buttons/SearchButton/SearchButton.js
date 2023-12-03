import cn from 'classnames';
import { ReactSVG } from 'react-svg';

import style from './searchButton.module.scss';

export function SearchButton({ classNames, handleClick, icon, label }) {
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
}
