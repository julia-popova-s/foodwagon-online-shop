import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Product,
  ProductInfoQuantity,
  addProduct,
  deleteOneProduct,
  setProductCount,
} from '../../../store/reducers/cart';
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

const SearchPage: FC = () => {
  const error = useSelector(errorSelector);
  const currentPage = useSelector(currentPageSelector);
  const products = useSelector(productListSelector);
  const isLoaded = useSelector(isLoadedSelector);
  const status = useSelector(statusSelector);
  const dispatch = useDispatch();

  const handleChangePage = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const handleAddProduct = (item: Product) => {
    dispatch(addProduct(item));
  };

  const handleRemoveProduct = (product: Product) => {
    dispatch(deleteOneProduct(product));
  };

  const handleInputCount = (item: ProductInfoQuantity) => {
    dispatch(setProductCount(item));
  };
  const skeleton = new Array(4).fill(0).map((_, index) => <Loader key={index} />);

  return (
    <div className={style.searchPage}>
      <div className="container">
        <div className={style.title}>Search Food</div>
        <div className={style.panel}>
          <SearchPanel />
        </div>

        {status === 'reject' && typeof error === 'string' && <div className={style.message}>{error}</div>}

        <div className={style.menuList}>
          {isLoaded &&
            products.map((item) => (
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
      </div>
    </div>
  );
};
export default SearchPage;
