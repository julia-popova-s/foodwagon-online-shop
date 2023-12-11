import cn from 'classnames';
import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';

import { addProduct, deleteOneProduct, setProductCount } from '../../../store/reducers/cart';
import { isLoadedSelector, productListSelector } from '../../../store/reducers/productsPopular';
import { fetchProductsPopular } from '../../../store/reducers/productsPopular';
import { Card } from '../../ui/Card';
import { SliderButton } from '../../ui/buttons/SliderButton';
import { Loader } from './Loader';
import style from './popularItems.module.scss';

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
export const PopularItems: FC = () => {
  const dispatch = useDispatch<any>();

  const slider = useRef<Slider>(null);

  useEffect(() => {
    dispatch(
      fetchProductsPopular({
        currentPage: 2,
        limit: 10,
        rating: 5,
      }),
    );
  }, []);

  const isLoaded = useSelector(isLoadedSelector);
  const products = useSelector(productListSelector);

  const handleAddProduct = (product: Product) => {
    dispatch(addProduct(product));
  };

  const handleRemoveProduct = (product: Product) => {
    dispatch(deleteOneProduct(product));
  };

  const handleInputCount = (obj: ProductQuantity) => {
    dispatch(setProductCount(obj));
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    nextArrow: (
      <SliderButton
        classNames={cn(style.popularItems__btn, style.popularItems__btn_right)}
        handleClick={() => slider?.current?.slickNext()}
        type={'right'}
      />
    ),
    prevArrow: (
      <SliderButton
        classNames={cn(style.popularItems__btn, style.popularItems__btn_left)}
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
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1480,
        settings: {
          dots: false,
          infinite: true,
          slidesToScroll: 1,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1180,
        settings: {
          dots: false,
          infinite: true,
          slidesToScroll: 1,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 760,
        settings: {
          dots: false,
          infinite: true,
          slidesToScroll: 1,
          slidesToShow: 1,
        },
      },
    ],
    slidesToScroll: 1,
    slidesToShow: 5,
    speed: 500,
  };

  const skeleton = new Array(5).fill(0).map((_, index) => <Loader key={index} />);

  return (
    <section className={style.popularItemsBlock}>
      <div className={style.container}>
        <div className={style.popularItems}>
          <h3 className={style.popularItems__title}>Popular items</h3>

          <div className={style.popularItems__list}>
            <Slider {...sliderSettings} ref={slider}>
              {isLoaded
                ? products.map((item) => {
                    return (
                      <Card
                        key={item.id}
                        {...item}
                        classNames={style.popularItems__card}
                        handleAddProduct={(obj) => handleAddProduct(obj)}
                        handleInputCount={(obj) => handleInputCount(obj)}
                        handleRemoveProduct={(obj) => handleRemoveProduct(obj)}
                      />
                    );
                  })
                : skeleton}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};
