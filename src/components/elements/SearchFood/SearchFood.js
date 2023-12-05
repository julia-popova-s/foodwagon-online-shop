import '/node_modules/slick-carousel/slick/slick.css';
import '/node_modules/slick-carousel/slick/slick-theme.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import { ReactSVG } from 'react-svg';
import { v4 as uuidv4 } from 'uuid';

import { addProduct, deleteOneProduct, setProductCount } from '../../../store/reducers/cart';
import { searchBySelector, setSearchBy } from '../../../store/reducers/filters';
import { fetchProducts, isLoadedSelector, productListSelector } from '../../../store/reducers/products';
import { Card } from '../../ui/Card';
import { CardFood } from './CardFood';
import { Loader } from './Loader';
import style from './searchFood.module.scss';
import { sliderSettings } from './sliderSettings';

const typeFood = [
  {
    imageSrc: '/images/search-food/2.png',
    name: 'Burger',
  },
  {
    imageSrc: '/images/search-food/5.png',
    name: 'Pasta',
  },
  {
    imageSrc: '/images/search-food/8.jpg',
    name: 'Salad',
  },
  { imageSrc: '/images/search-food/11.jpg', name: 'Soup' },
  { imageSrc: '/images/search-food/10.jpg', name: 'Potato' },
  { imageSrc: '/images/search-food/9.jpg', name: 'Drink' },
  { imageSrc: '/images/search-food/7.jpg', name: 'Fish' },
  { imageSrc: '/images/search-food/6.png', name: 'Meat' },
];

export function SearchFood() {
  const [limit, setLimit] = useState(4);
  const dispatch = useDispatch();
  const searchBy = useSelector(searchBySelector);

  const isLoaded = useSelector(isLoadedSelector);
  const products = useSelector(productListSelector);

  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    if (searchBy !== null)
      dispatch(
        fetchProducts({
          category: `${typeFood[searchBy].name}`,
          limit,
          page: 1,
        }),
      );
  }, [dispatch, searchBy, limit]);

  const handleSelectCategory = (index) => {
    dispatch(setSearchBy(index));
  };

  const handleAddProduct = (product) => {
    dispatch(addProduct(product));
  };

  const handleRemoveProduct = (product) => {
    dispatch(deleteOneProduct(product));
  };

  const handleInputCount = (obj) => {
    dispatch(setProductCount(obj));
  };

  const handleViewAll = () => {
    setLimit(false);
  };

  const skeleton = new Array(products?.length).fill(0).map((_, index) => <Loader key={index} />);

  return (
    <section className={style.searchFoodBlock} id="searchByFood">
      <div className="container">
        <div className={style.searchFood}>
          <h5 className={style.searchFood__title}>Search by Food</h5>

          <Slider {...sliderSettings} className={style.searchFood__slider}>
            {typeFood &&
              typeFood.map((item, i) => {
                return (
                  <CardFood
                    key={uuidv4()}
                    {...item}
                    classNames={style.searchFood__item}
                    onClickCategory={() => handleSelectCategory(i)}
                  />
                );
              })}
          </Slider>

          <div className={style.menuList}>
            {isLoaded && products
              ? products.map((item, i) => {
                  return (
                    <Card
                      key={`${item.id}${i}`}
                      {...item}
                      classNames={style.menuList__item}
                      handleAddProduct={(obj) => handleAddProduct(obj)}
                      handleInputCount={(obj) => handleInputCount(obj)}
                      handleRemoveProduct={(obj) => handleRemoveProduct(obj)}
                      quantity={cart[item.restaurantId]?.items[item.id]?.quantity}
                    />
                  );
                })
              : skeleton}
          </div>

          <button className={style.searchFood__btnView} onClick={handleViewAll}>
            View All
            <ReactSVG
              className={style.searchFood__btnViewArrow}
              src={process.env.PUBLIC_URL + '/images/search-food/left.svg'}
              wrapper="span"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
