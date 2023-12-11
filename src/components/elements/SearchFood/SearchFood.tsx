import '/node_modules/slick-carousel/slick/slick.css';
import '/node_modules/slick-carousel/slick/slick-theme.css';
import cn from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { ReactSVG } from 'react-svg';
import { v4 as uuidv4 } from 'uuid';

import { addProduct, cartSelector, deleteOneProduct, setProductCount } from '../../../store/reducers/cart';
import { searchBySelector, setSearchBy } from '../../../store/reducers/filters';
import { fetchProducts, isLoadedSelector, productListSelector } from '../../../store/reducers/products';
import { Card } from '../../ui/Card';
import { SliderButton } from '../../ui/buttons/SliderButton';
import { CardFood } from './CardFood';
import { Loader } from './Loader';
import style from './searchFood.module.scss';

type ProductQuantity = {
  id: string;
  price: number;
  quantity: number;
  restaurantId: string;
};

type Product = {
  discount: number;
  id: string;
  image: string;
  price: number;
  restaurantId: string;
  restaurantName: string;
  title: string;
};
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

export const SearchFood: FC = () => {
  const [limit, setLimit] = useState<number>(4);
  const dispatch = useDispatch<any>();
  const searchBy = useSelector(searchBySelector);

  const isLoaded = useSelector(isLoadedSelector);
  const products = useSelector(productListSelector);

  const cart = useSelector(cartSelector);

  const slider = useRef<Slider>(null);

  useEffect(() => {
    if (searchBy !== -1)
      dispatch(
        fetchProducts({
          category: `${typeFood[searchBy].name}`,
          currentPage: 1,
          limit,
        }),
      );
  }, [dispatch, searchBy, limit]);

  const handleSelectCategory = (index: number) => {
    dispatch(setSearchBy(index));
  };

  const handleAddProduct = (product: Product) => {
    dispatch(addProduct(product));
  };

  const handleRemoveProduct = (product: Product) => {
    dispatch(deleteOneProduct(product));
  };

  const handleInputCount = (obj: ProductQuantity) => {
    dispatch(setProductCount(obj));
  };

  const handleViewAll = () => {
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
            {typeFood &&
              typeFood.map((item, i) => {
                return (
                  <CardFood
                    key={uuidv4()}
                    {...item}
                    classNames={style.searchFood__item}
                    handleClickCategory={() => handleSelectCategory(i)}
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
};
