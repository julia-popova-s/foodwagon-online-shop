import cn from 'classnames';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../../store';
import {
  Product,
  ProductInfoQuantity,
  addProduct,
  deleteOneProduct,
  setProductCount,
} from '../../../store/reducers/cart';
import {
  ProductOrderType,
  ProductSortingType,
  categorySelector,
  orderTypeSelector,
  setCurrentPage,
  setSortBy,
  sortTypeSelector,
} from '../../../store/reducers/filters';
import {
  currentPageSelector,
  fetchProducts,
  isLoadedSelector,
  productListSelector,
} from '../../../store/reducers/products';
import { SortPopup } from '../../elements/SortPopup';
import { Card } from '../../ui/Card';
import { Pagination } from '../../ui/Pagination/Pagination';
import { Loader } from './Loader';
import style from './restaurantPage.module.scss';

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

export const RestaurantPage: FC = () => {
  const { restaurantId } = useParams();

  const dispatch = useAppDispatch();

  const category = useSelector(categorySelector);
  const orderType = useSelector(orderTypeSelector);
  const sortType = useSelector(sortTypeSelector);

  const currentPage = useSelector(currentPageSelector);
  const isLoaded = useSelector(isLoadedSelector);
  const products = useSelector(productListSelector);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleChangePage = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const handleSelectSortType = (sortType: any, orderType: any) => {
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
  }, [sortType, category, restaurantId, currentPage,orderType]);

  const handleAddProduct = (item: Product) => {
    dispatch(addProduct(item));
  };

  const handleRemoveProduct = (item: Product) => {
    dispatch(deleteOneProduct(item));
  };

  const handleInputCount = (item: ProductInfoQuantity) => {
    dispatch(setProductCount(item));
  };

  const skeleton = new Array(4).fill(0).map((_, index) => <Loader key={index} />);

  if (!isLoaded && !products?.length) {
    return (
      <div className={cn(style.restaurant)}>
        <div className="container">
          <div className={style.alert}>Nothing was found according to your request. Go to another page.</div>
          <Pagination currentPage={currentPage} handleChangePage={handleChangePage} pageCount={5} />
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
            handleClickSortType={handleSelectSortType}
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
                  handleAddProduct={handleAddProduct}
                  handleInputCount={handleInputCount}
                  handleRemoveProduct={handleRemoveProduct}
                />
              ))
            : skeleton}
        </div>
      </div>

      <div className="container">
        <Pagination currentPage={currentPage} handleChangePage={handleChangePage} pageCount={5} />
      </div>
    </div>
  );
};
