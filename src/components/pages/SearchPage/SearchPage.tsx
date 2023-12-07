import { useDispatch, useSelector } from 'react-redux';

import { addProduct, deleteOneProduct, setProductCount } from '../../../store/reducers/cart';
import {
  currentPageSelector,
  errorSelector,
  isLoadedSelector,
  productListSelector,
  setCurrentPage,
  statusSelector,
} from '../../../store/reducers/productsSearch';
import { SearchPanel } from '../../elements/FindFood/SearchPanel';
import { Card } from '../../ui/Card';
import { Pagination } from '../../ui/Pagination/Pagination';
import { Loader } from './Loader';
import style from './searchPage.module.scss';

function SearchPage() {
  const error = useSelector(errorSelector);
  const currentPage = useSelector(currentPageSelector);
  const products = useSelector(productListSelector);
  const isLoaded = useSelector(isLoadedSelector);
  const status = useSelector(statusSelector);

  const dispatch = useDispatch();

  const handleChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const handleAddProduct = (obj) => {
    dispatch(addProduct(obj));
  };

  const handleRemoveProduct = (product) => {
    dispatch(deleteOneProduct(product));
  };

  const handleInputCount = (obj) => {
    dispatch(setProductCount(obj));
  };

  const skeleton = new Array(4).fill(0).map((_, index) => <Loader key={index} />);

  return (
    <div className={style.searchPage}>
      <div className="container">
        <div className={style.title}>Search Food</div>
        <div className={style.panel}>
          <SearchPanel />
        </div>

        {error && <div className={style.message}>{error}</div>}

        <div className={style.menuList}>
          {isLoaded &&
            products.map((item, i) => (
              <Card
                classNames={style.menuList__item}
                key={item.id}
                {...item}
                handleAddProduct={handleAddProduct}
                handleInputCount={handleInputCount}
                handleRemoveProduct={handleRemoveProduct}
              />
            ))}

          {status === 'loading' && skeleton}
        </div>

        {status && !error && <Pagination currentPage={currentPage} handleChangePage={handleChangePage} pageCount={3} />}

        {!status && <div className={style.message}>Are you ready to order with the best deals?</div>}
      </div>
    </div>
  );
}
export default SearchPage;
