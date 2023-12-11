import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';

import { addProduct, deleteOneProduct, setProductCount } from '../../../store/reducers/cart';
import { fetchProductsPopular } from '../../../store/reducers/productsPopular';
import { isLoadedSelector, productListSelector } from '../../../store/reducers/productsPopular';
import { Card } from '../../ui/Card';
import { Loader } from './Loader';
import style from './popularItems.module.scss';
import { sliderSettings } from './sliderSettings';

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

  const skeleton = new Array(5).fill(0).map((_, index) => <Loader key={index} />);

  return (
    <section className={style.popularItemsBlock}>
      <div className={style.container}>
        <div className={style.popularItems}>
          <h3 className={style.popularItems__title}>Popular items</h3>

          <div className={style.popularItems__list}>
            <Slider {...sliderSettings}>
              {isLoaded
                ? products.map((item, i) => {
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
