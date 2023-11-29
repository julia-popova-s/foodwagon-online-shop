import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { useScroll } from 'react-use';

import { addProduct, deleteOneProduct, setProductCount } from '../../../store/reducers/cart';
import { categorySelector, setCurrentPage } from '../../../store/reducers/filters';
import {
  currentPageSelector,
  fetchProducts,
  isLoadedSelector,
  productListSelector,
} from '../../../store/reducers/products';
import { orderSelector, setSortType, sortTypeSelector } from '../../../store/reducers/sortingType';
import { SortPopup } from '../../elements/SortPopup';
import { Card } from '../../ui/Card';
import { Pagination } from '../../ui/Pagination/Pagination';
import { Loader } from './Loader';
import style from './restaurantPage.module.scss';

const sortItems = [
  { name: 'popularity ', order: 'desc', type: 'rating' },
  {
    name: 'price ascending',
    order: 'asc',
    type: 'price',
  },
  {
    name: 'price descending',
    order: 'desc',
    type: 'price',
  },
  { name: 'discount', order: 'desc', type: 'discount' },
  { name: 'alphabetically', order: 'asc', type: 'title' },
];

export function RestaurantPage() {
  const { pathname } = useLocation();

  const box = useRef(null);
  const [scroll, setScroll] = useState({ x: 0, y: 0 });

  useScroll(box, ({ scrollX, scrollY }) => setScroll({ x: scrollX, y: scrollY }));
  console.log(scroll);
  const { restaurantId } = useParams();

  const dispatch = useDispatch();

  const category = useSelector(categorySelector);
  const order = useSelector(orderSelector);
  const sortType = useSelector(sortTypeSelector);

  const currentPage = useSelector(currentPageSelector);
  const isLoaded = useSelector(isLoadedSelector);
  const products = useSelector(productListSelector);

  const handleChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const handleSelectSortType = (type, order) => {
    dispatch(setSortType({ order, type }));
  };

  useEffect(() => {
    dispatch(
      fetchProducts({
        currentPage,
        limit: 4,
        order,
        restaurantId,
        sortType,
      }),
    );
  }, [sortType, category, restaurantId, order, currentPage]);

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

  if (!isLoaded && !products?.length) {
    return (
      <div className={cn(style.restaurant)} ref={box}>
        <div className="container">
          <div className={style.alert}>Nothing was found according to your request. Go to another page.</div>
          <Pagination currentPage={currentPage} handleChangePage={handleChangePage} pageCount={5} />
        </div>
      </div>
    );
  }

  return (
    <div className={style.restaurant} ref={box}>
      <div className="container">
        <div className={style.filters}>
          <SortPopup
            activeSortType={sortType}
            classNames={style.filters__sortBy}
            handleClickSortType={handleSelectSortType}
            items={sortItems}
            orderType={order}
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
}
