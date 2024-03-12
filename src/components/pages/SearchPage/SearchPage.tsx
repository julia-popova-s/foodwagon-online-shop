import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../../store';
import { addProduct, deleteOneProduct, setProductCount } from '../../../store/slices/cart/slice';
import { Product, ProductInfoQuantity } from '../../../store/slices/cart/types';
import {
  currentPageSelector,
  errorSelector,
  isLoadedSelector,
  productListSelector,
  setCurrentPage,
  statusSelector,
} from '../../../store/slices/productsSearch/slice';
import { Card } from '../../ui/Card';
import { Pagination } from '../../ui/Pagination/Pagination';
import { Loader } from './Loader';
import { SearchPanel } from './SearchPanel';
import style from './searchPage.module.scss';

export const SearchPage: FC = () => {
  const error = useAppSelector(errorSelector);
  const currentPage = useAppSelector(currentPageSelector);
  const products = useAppSelector(productListSelector);
  const isLoaded = useAppSelector(isLoadedSelector);
  const status = useAppSelector(statusSelector);

  const dispatch = useAppDispatch();

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
