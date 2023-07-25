import cn from 'classnames'
import { useEffect, useState } from 'react'
// import { cutPartOfString } from '../../../utils/cutPartOfString'
import { useDispatch, useSelector } from 'react-redux'
import Slider from 'react-slick'

import { addProduct, deleteOneProduct, setProductCount } from '../../../store/reducers/cart'
// import { getRandomNumber } from '../../../utils/getRandomNumber'
import { fetchProductsPopular } from '../../../store/reducers/productsPopular'
import { ButtonSlider } from '../../ui/ButtonSlider'
// import { Loader } from '../../ui/Loader'
import { CardPopular } from './CardPopular'
import { Loader } from './Loader'
import styles from './popularItems.module.scss'

const settings = {
  dots: false,
  infinite: true,
  nextArrow: (
    <ButtonSlider
      classNames={cn(styles.popularItems__btn, styles.popularItems__btn_right)}
      type={'right'}
    />
  ),
  prevArrow: (
    <ButtonSlider
      classNames={cn(styles.popularItems__btn, styles.popularItems__btn_left)}
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
      breakpoint: 890,
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
}

export function PopularItems() {
  const [limit, setLimit] = useState(10)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      fetchProductsPopular({
        filter: '&rating=5',
        limit,
      })
    )
  }, [limit])

  const { isLoaded, products } = useSelector((state) => state.productsPopular)
  const { cart } = useSelector((state) => state.cart)

  const handleAddProduct = (product) => {
    dispatch(addProduct(product))
  }

  const handleRemoveProduct = (product) => {
    dispatch(deleteOneProduct(product))
  }

  const handleInputCount = (obj) => {
    dispatch(setProductCount(obj))
  }

  return (
    <div className={styles.popularItemsBlock}>
      <div className={styles.container}>
        <div className={styles.popularItems}>
          <h3 className={styles.popularItems__title}>Popular items</h3>

          <div className={styles.popularItems__list}>
            <Slider {...settings}>
              {isLoaded
                ? products.map((item, i) => {
                    return (
                      <CardPopular
                        key={item.id}
                        {...item}
                        classNames={styles.popularItems__card}
                        handleAddProduct={(obj) => handleAddProduct(obj)}
                        handleInputCount={(obj) => handleInputCount(obj)}
                        handleRemoveProduct={(obj) => handleRemoveProduct(obj)}
                        quantity={cart[item.restaurantId]?.items[item.id]?.quantity}
                      />
                    )
                  })
                : Array(5)
                    .fill(0)
                    .map((_, index) => <Loader key={index} />)}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  )
}
