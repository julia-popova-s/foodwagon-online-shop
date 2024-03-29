import { ReactComponent as Search } from '../../../../assets/images/header/search.svg';
import style from './searchLink.module.scss';

export const SearchLink = () => {
  return (
    <div className={style.searchLink}>
      <Search />
      <span className={style.searchLink__name}>Search Food</span>
    </div>
  );
};
