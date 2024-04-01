import { FC } from 'react';

import { useScrollTo } from '../../../hooks/useScrollTo';
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
import { SearchPanel } from '../../elements/SearchPanel';
import { Card } from '../../ui/Card';
import { Pagination } from '../../ui/Pagination/Pagination';
import { Loader } from './Loader';
import style from './searchPage.module.scss';

export const SearchPage: FC = () => {
  useScrollTo();

  const error = useAppSelector(errorSelector);
  const currentPage = useAppSelector(currentPageSelector);
  const products = useAppSelector(productListSelector);
  const isLoaded = useAppSelector(isLoadedSelector);
  const status = useAppSelector(statusSelector);

  const dispatch = useAppDispatch();

  const handlePageChange = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const handleProductAdd = (item: Product) => {
    dispatch(addProduct(item));
  };

  const handleProductRemove = (product: Product) => {
    dispatch(deleteOneProduct(product));
  };

  const handleCountInput = (item: ProductInfoQuantity) => {
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
                handleCountInput={handleCountInput}
                handleProductAdd={handleProductAdd}
                handleProductRemove={handleProductRemove}
              />
            ))}

          {status === 'loading' && skeleton}
        </div>

        {status && !error && <Pagination currentPage={currentPage} handlePageChange={handlePageChange} pageCount={3} />}
      </div>
    </div>
  );
};
