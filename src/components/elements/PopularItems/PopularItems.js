import cn from 'classnames';
import { useEffect, useState } from 'react';
// import { cutPartOfString } from '../../../utils/cutPartOfString'
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';

import { addProduct, deleteOneProduct, setProductCount } from '../../../store/reducers/cart';
import { isLoadedSelector, productListSelector } from '../../../store/reducers/productsPopular';
// import { getRandomNumber } from '../../../utils/getRandomNumber'
import { fetchProductsPopular } from '../../../store/reducers/productsPopular';
import { ButtonSlider } from '../../ui/ButtonSlider';
// import { Loader } from '../../ui/Loader'
import { CardPopular } from './CardPopular';
import { Loader } from './Loader';
import style from './popularItems.module.scss';

const settings = {
  dots: false,
  infinite: true,
  nextArrow: (
    <ButtonSlider
      classNames={cn(style.popularItems__btn, style.popularItems__btn_right)}
      type={'right'}
    />
  ),
  prevArrow: (
    <ButtonSlider
      classNames={cn(style.popularItems__btn, style.popularItems__btn_left)}
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

export function PopularItems() {
  const [limit, setLimit] = useState(10);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchProductsPopular({
        filter: '&rating=5',
        limit,
        page: 2,
      })
    );
  }, [limit]);

  const isLoaded = useSelector(isLoadedSelector);
  const products = useSelector(productListSelector);

  const handleAddProduct = (product) => {
    dispatch(addProduct(product));
  };

  const handleRemoveProduct = (product) => {
    dispatch(deleteOneProduct(product));
  };

  const handleInputCount = (obj) => {
    dispatch(setProductCount(obj));
  };

  return (
    <div className={style.popularItemsBlock}>
      <div className={style.container}>
        <div className={style.popularItems}>
          <h3 className={style.popularItems__title}>Popular items</h3>

          <div className={style.popularItems__list}>
            <Slider {...settings}>
              {isLoaded
                ? products.map((item, i) => {
                  return (
                    <CardPopular
                      key={item.id}
                      {...item}
                      classNames={style.popularItems__card}
                      handleAddProduct={(obj) => handleAddProduct(obj)}
                      handleInputCount={(obj) => handleInputCount(obj)}
                      handleRemoveProduct={(obj) => handleRemoveProduct(obj)}
                    />
                  );
                })
                : Array(5)
                  .fill(0)
                  .map((_, index) => <Loader key={index} />)}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
