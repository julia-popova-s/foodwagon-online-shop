import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import debounce from 'lodash.debounce'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import { fetchProducts } from '../../../store/reducers/products'
import { ButtonFind } from '../../ui/ButtonFind'
import style from './searchPanel.module.scss'

export function SearchPanel({ currentPage }) {
  const [searchValue, setSearchValue] = useState('')
  const [value, setValue] = useState('')
  const [visiblePopup, setVisiblePopup] = useState(false)

  const inputRef = useRef(null)
  const popupRef = useRef(null)
  const searchRef = useRef(null)

  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.products)

  const onClickClear = () => {
    setValue('')
    setSearchValue('')
    inputRef.current.focus()
  }

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str)
    }, 300),
    []
  )

  const onChangeValue = (e) => {
    setValue(e.target.value)
    updateSearchValue(e.target.value)
  }

  const handleSearch = () => {
    dispatch(
      fetchProducts({
        filter: `&search=${value}`,
        limit: 8,
        page: currentPage,
      })
    )
  }

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (popupRef.current?.contains(e.target) || searchRef.current?.contains(e.target)) {
        setVisiblePopup(true)
      } else {
        setVisiblePopup(false)
      }
      return
    }
    document.body.addEventListener('click', (e) => handleOutsideClick(e))

    return () => document.body.removeEventListener('click', (e) => handleOutsideClick(e))
  }, [])

  useEffect(() => {
    if (searchValue) {
      dispatch(
        fetchProducts({
          filter: `&search=${searchValue.replace(' ', '&')}`,
          limit: 4,
        })
      )
    }
  }, [dispatch, searchValue])

  return (
    <div className={style.search} ref={searchRef}>
      <input
        className={style.search__input}
        name="find"
        onChange={onChangeValue}
        placeholder="Enter your request"
        ref={inputRef}
        type="text"
        value={value}
      />
      <FontAwesomeIcon className={style.search__inputIcon} icon={faLocationDot} size="xl" />
      {/* <Link to={'search'}> */}
      <ButtonFind
        classNames={style.search__btn}
        handleClick={handleSearch}
        icon="search"
        label="Find Food"
      />
      {/* </Link> */}
      {value && (
        <svg
          className={style.search__clearIcon}
          onClick={onClickClear}
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fillRule="evenodd" id="Fail">
            <path d="m16 3a13 13 0 1 1 -13 13 13.006 13.006 0 0 1 13-13zm0-2a15 15 0 1 0 15 15 15.007 15.007 0 0 0 -15-15z"></path>
            <path d="m14.586 16-4.293 4.293a1 1 0 0 0 1.414 1.414l4.293-4.293 4.293 4.293a1 1 0 1 0 1.414-1.414l-4.293-4.293 4.293-4.293a1 1 0 0 0 -1.414-1.414l-4.293 4.293-4.293-4.293a1 1 0 0 0 -1.414 1.414z"></path>
          </g>
        </svg>
      )}

      <CSSTransition classNames="alert" in={visiblePopup} timeout={2000} unmountOnExit>
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
      </CSSTransition>
    </div>
  )
}
