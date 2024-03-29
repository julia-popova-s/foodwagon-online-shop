import cn from 'classnames';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../store';
import { addProduct, deleteOneProduct, setProductCount } from '../../../store/slices/cart/slice';
import { Product, ProductInfoQuantity } from '../../../store/slices/cart/types';
import {
  categorySelector,
  orderTypeSelector,
  setCurrentPage,
  setSortBy,
  sortTypeSelector,
} from '../../../store/slices/filters/slice';
import { ProductOrderType, ProductSortingType } from '../../../store/slices/filters/types';
import {
  currentPageSelector,
  fetchProducts,
  isLoadedSelector,
  productListSelector,
  statusSelector,
} from '../../../store/slices/products/slice';
import { SortPopup } from '../../elements/SortPopup';
import { Card } from '../../ui/Card';
import { Pagination } from '../../ui/Pagination/Pagination';
import { Loader } from './Loader';
import style from './restaurantMenu.module.scss';

const SORT_ITEMS = [
  { name: 'popularity ', order: ProductOrderType.DESC, type: ProductSortingType.RATING },
  {
    name: 'increasing price',
    order: ProductOrderType.ASC,
    type: ProductSortingType.PRICE,
  },
  {
    name: 'decreasing price',
    order: ProductOrderType.DESC,
    type: ProductSortingType.PRICE,
  },
  { name: 'discount', order: ProductOrderType.DESC, type: ProductSortingType.DISCOUNT },
  { name: 'alphabetically', order: ProductOrderType.ASC, type: ProductSortingType.TITLE },
];

export const RestaurantMenu: FC = () => {
  const { restaurantId } = useParams();

  const dispatch = useAppDispatch();

  const category = useAppSelector(categorySelector);
  const orderType = useAppSelector(orderTypeSelector);
  const sortType = useAppSelector(sortTypeSelector);

  const currentPage = useAppSelector(currentPageSelector);
  const isLoaded = useAppSelector(isLoadedSelector);
  const products = useAppSelector(productListSelector);
  const status = useAppSelector(statusSelector);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const handleSortTypeChange = (sortType: any, orderType: any) => {
    dispatch(setSortBy({ orderType, sortType }));
  };

  useEffect(() => {
    dispatch(
      fetchProducts({
        currentPage,
        limit: 4,
        orderType,
        restaurantId,
        sortType,
      }),
    );
  }, [sortType, category, restaurantId, currentPage, orderType]);

  const handleProductAdd = (item: Product) => {
    dispatch(addProduct(item));
  };

  const handleProductRemove = (item: Product) => {
    dispatch(deleteOneProduct(item));
  };

  const handleCountInput = (item: ProductInfoQuantity) => {
    dispatch(setProductCount(item));
  };

  const skeleton = new Array(4).fill(0).map((_, index) => <Loader key={index} />);

  if (status === 'reject') {
    return (
      <div className={cn(style.restaurant)}>
        <div className="container">
          <div className={style.alert}>Nothing was found according to your request. Go to another page.</div>
          <Pagination currentPage={currentPage} handleChangePage={handlePageChange} pageCount={5} />
        </div>
      </div>
    );
  }

  return (
    <div className={style.restaurant}>
      <div className="container">
        <div className={style.filters}>
          <SortPopup
            activeSortType={sortType}
            classNames={style.filters__sortBy}
            handleChangeSortType={handleSortTypeChange}
            items={SORT_ITEMS}
            orderType={orderType}
          />
        </div>
        <div className={style.menuList}>
          {isLoaded && products
            ? products.map((item) => (
                <Card
                  classNames={style.menuList__item}
                  key={item.id}
                  {...item}
                  handleCountInput={handleCountInput}
                  handleProductAdd={handleProductAdd}
                  handleProductRemove={handleProductRemove}
                />
              ))
            : skeleton}
        </div>
      </div>

      <div className="container">
        <Pagination currentPage={currentPage} handleChangePage={handlePageChange} pageCount={5} />
      </div>
    </div>
  );
};
