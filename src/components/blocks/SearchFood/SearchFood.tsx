import cn from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { ReactSVG } from 'react-svg';
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch, useAppSelector } from '../../../store';
import { addProduct, cartSelector, deleteOneProduct, setProductCount } from '../../../store/slices/cart/slice';
import { Product, ProductInfoQuantity } from '../../../store/slices/cart/types';
import { searchBySelector, setSearchBy } from '../../../store/slices/filters/slice';
import { fetchProducts, isLoadedSelector, productListSelector } from '../../../store/slices/products/slice';
import { CardFood } from '../../elements/CardFood';
import { Card } from '../../ui/Card';
import { SliderButton } from '../../ui/buttons/SliderButton';
import { Loader } from './Loader';
import style from './searchFood.module.scss';

type TypeFoodItem = {
  imageSrc: string;
  name: string;
};

const TYPE_FOOD: TypeFoodItem[] = [
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

export const SearchFood: FC = () => {
  const [limit, setLimit] = useState<number>(4);

  const dispatch = useAppDispatch();

  const searchBy = useAppSelector(searchBySelector);

  const isLoaded = useAppSelector(isLoadedSelector);
  const products = useAppSelector(productListSelector);

  const cart = useAppSelector(cartSelector);

  const slider = useRef<Slider>(null);

  useEffect(() => {
    if (searchBy !== -1)
      dispatch(
        fetchProducts({
          category: `${TYPE_FOOD[searchBy].name}`,
          currentPage: 1,
          limit,
        }),
      );
  }, [dispatch, searchBy, limit]);

  const handleCategorySelect = (index: number) => {
    dispatch(setSearchBy(index));
  };

  const handleProductAdd = (product: Product) => {
    dispatch(addProduct(product));
  };

  const handleProductRemove = (product: Product) => {
    dispatch(deleteOneProduct(product));
  };

  const handleCountInput = (obj: ProductInfoQuantity) => {
    dispatch(setProductCount(obj));
  };

  const handleAllView = () => {
    setLimit(limit * 2);
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    nextArrow: (
      <SliderButton
        classNames={cn(style.searchFood__btn, style.searchFood__btn_right)}
        handleClick={() => slider?.current?.slickNext()}
        type={'right'}
      />
    ),
    prevArrow: (
      <SliderButton
        classNames={cn(style.searchFood__btn, style.searchFood__btn_left)}
        handleClick={() => slider?.current?.slickPrev()}
        type={'left'}
      />
    ),
    responsive: [
      {
        breakpoint: 1770,
        settings: {
          dots: false,
          infinite: true,
          slidesToScroll: 1,
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1480,
        settings: {
          dots: false,
          infinite: true,
          slidesToScroll: 1,
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1180,
        settings: {
          dots: false,
          infinite: true,
          slidesToScroll: 1,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 890,
        settings: {
          dots: false,
          infinite: true,
          slidesToScroll: 1,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 625,
        settings: {
          dots: false,
          infinite: true,
          slidesToScroll: 1,
          slidesToShow: 1,
        },
      },
    ],
    slidesToScroll: 1,
    slidesToShow: 6,
    speed: 500,
  };

  const skeleton = new Array(products?.length).fill(0).map((_, index) => <Loader key={index} />);

  return (
    <section className={style.searchFoodBlock} id="searchByFood">
      <div className="container">
        <div className={style.searchFood}>
          <h5 className={style.searchFood__title}>Search by Food</h5>

          <Slider {...sliderSettings} className={style.searchFood__slider} ref={slider}>
            {TYPE_FOOD &&
              TYPE_FOOD.map((item, i) => {
                return (
                  <CardFood
                    key={uuidv4()}
                    {...item}
                    classNames={style.searchFood__item}
                    handleCategoryClick={() => handleCategorySelect(i)}
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
                      handleCountInput={(obj) => handleCountInput(obj)}
                      handleProductAdd={(obj) => handleProductAdd(obj)}
                      handleProductRemove={(obj) => handleProductRemove(obj)}
                      quantity={cart[item.restaurantId]?.items[item.id]?.quantity}
                    />
                  );
                })
              : skeleton}
          </div>

          <button className={style.searchFood__btnView} onClick={handleAllView}>
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
};
