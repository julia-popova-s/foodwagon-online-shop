import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
// import { clearCart } from '../../../store/reducers/cart'
import {
  addProduct,
  clearCart,
  deleteOneProduct,
  removeProduct,
  setProductCount,
} from '../../../store/reducers/cart'
import { ButtonOrder } from '../../ui/ButtonOrder/ButtonOrder'
import { CardProduct } from './CardProduct'
import style from './cart.module.scss'
import { setVisiblePopup } from '../../../store/reducers/filters'
import { Popup } from '../../ui/Popup/Popup'
let orderNumber = 1

export function Cart() {
  const { pathname } = useLocation()
  const [name, setName] = useState('')
  const { visiblePopup } = useSelector((state) => state.filters)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const { addedGoods, cart, totalQuantity } = useSelector(({ cart }) => cart)

  const dispatch = useDispatch()

  const handleClearCart = ({ restaurantId, restaurantName }) => {
    // if (
    //   window.confirm(`Are you sure you want to empty the cart from «${restaurantName}» restaurant?`)
    // )
    setName(restaurantName)
    dispatch(setVisiblePopup(true))
    // dispatch(clearCart({ restaurantId }))
  }

  const handleRemoveProduct = ({ id, restaurantId }) => {
    dispatch(removeProduct({ id, restaurantId }))
  }

  const handleAddProduct = (product) => {
    dispatch(addProduct(product))
  }

  const handleDeleteProduct = (obj, count) => {
    const { id, restaurantId } = obj
    if (count < 1) {
      dispatch(removeProduct({ id, restaurantId }))
    } else dispatch(deleteOneProduct({ id, restaurantId }))
  }

  const handleInputQuantity = (obj) => {
    dispatch(setProductCount(obj))
  }

  const handlePlaceAnOrder = (id, name) => {
    console.log(`${name}. Order № ${orderNumber++}:`, cart[id])
    dispatch(clearCart({ restaurantId: id }))
  }

  return (
    <div className={style.cart}>
      <div className={cn(style.cart__container, 'container')}>
        <div className={style.cart__inner}>
          {totalQuantity ? (
            addedGoods.map((restaurant) => {
              const [restaurantId, info] = restaurant
              const products = Object.values(info.items)

              const price = info.totalAmount
              const quantity = info.totalCount
              const restaurantName = products[0] && products[0].restaurantName

              return (
                <div className={cn(style.cart__order, style.cart__order_border)} key={restaurantId}>
                  <div className={style.cart__top}>
                    <div className={style.cart__restaurantName}>
                      {/* <Link to={`/restaurant/${restaurantId}/product`} className={style.cart__restaurantLink}> */}
                      {restaurantName}
                      {/* </Link> */}
                    </div>
                    <div className={style.cart__clear}>
                      <button
                        className={style.cart__clearBtn}
                        onClick={() => handleClearCart({ restaurantId, restaurantName })}
                      >
                        <FontAwesomeIcon
                          className={style.cart__clearIcon}
                          icon={faTrashCan}
                          size="lg"
                        />
                        clear
                      </button>
                    </div>
                  </div>

                  <div className={style.cart__list}>
                    {quantity ? (
                      <>
                        {products.map(({ quantity, ...item }, i) => {
                          return (
                            <CardProduct
                              {...item}
                              handleAddProduct={(item) => handleAddProduct(item)}
                              handleDeleteProduct={(obj) => handleDeleteProduct(obj, quantity)}
                              handleInputCount={(obj) => handleInputQuantity(obj)}
                              handleRemoveProduct={(obj) => handleRemoveProduct(obj)}
                              key={item.id}
                              quantity={quantity}
                              restaurantId={item.restaurantId}
                            />
                          )
                        })}
                        <div className={cn(style.cart__orderInfo, style.cart__orderInfo_border)}>
                          <p className={style.cart__result}>
                            Your order for the total amount &#36;{' '}
                            <span className={style.cart__result_color}>
                              {price && price.toFixed(2)}
                            </span>{' '}
                            and <span className={style.cart__result_color}>{quantity}</span> items
                          </p>
                          <ButtonOrder
                            name={`Place an order`}
                            onClick={() => handlePlaceAnOrder(restaurantId, restaurantName)}
                          />
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              )
            })
          ) : (
            <div className={style.cart__empty}>
              <p className={style.cart__name}>Shopping cart is empty</p>
              {/* <p className={style.cart__result}>
                Use the search to find everything you need.
              </p> */}
              {/* <img
                src="/images/cart/soup.jpg"
                alt="Creamy Tomato Soup"
                className={style.cart__image}
                aria-label="cart"
              /> */}
            </div>
          )}
        </div>
      </div>
      {visiblePopup && <Popup show={visiblePopup} name={name} />}
    </div>
  )
}
