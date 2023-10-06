import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchProducts } from '../../../store/reducers/products'
import { ButtonFind } from '../../ui/ButtonFind'
import { Search } from './Search'
import style from './searchPanel.module.scss'

export function SearchPanel() {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const popupRef = useRef(null)
  const searchPanelRef = useRef(null)
  const products = useSelector((state) => state.products.products)
  const [visiblePopup, setVisiblePopup] = useState(false)
  console.log(visiblePopup)
  console.log(products)

  useEffect(() => {
    const handleOutsideClick = (e) => {
      console.log(popupRef.current?.contains(e.target))
      if (popupRef.current?.contains(e.target) || searchPanelRef.current?.contains(e.target)) {
        setVisiblePopup(true)
      } else {
        setVisiblePopup(false)
      }
    }
    document.body.addEventListener('click', (e) => handleOutsideClick(e))

    return () => document.body.removeEventListener('click', (e) => handleOutsideClick(e))
  }, [])

  const handleSearch = () => {
    // dispatch(
    //   fetchProducts({
    //     filter: `&search=${value}`,
    //     limit: 8,
    //   })
    // )
  }

  return (
    <div className={style.searchPanel} ref={searchPanelRef}>
      <Search setValue={setValue} value={value} />

      <Link to={'search'}>
        <ButtonFind
          classNames={style.searchPanel__btn}
          handleClick={handleSearch}
          icon="search"
          label="Find Food"
        />
      </Link>
      {visiblePopup && (
        <div className={style.popup} ref={popupRef}>
          {products.map((el, i) => (
            <div className={style.popup__item} key={i}>
              <div className={style.popup__left}>
                <img
                  alt={el.title}
                  className={style.popup__image}
                  src={process.env.PUBLIC_URL + el.image}
                />
              </div>
              <div>
                {el.title}
                <div>{el.price}$</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
