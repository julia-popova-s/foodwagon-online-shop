import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'
import debounce from 'lodash.debounce'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchProductsFastAccess } from '../../../store/reducers/productsFastAccess'
import { fetchProductsSearch } from '../../../store/reducers/productsSearch'
import { setCurrentPage } from '../../../store/reducers/productsSearch'
import { ButtonFind } from '../../ui/ButtonFind'
import { TextInput } from '../../ui/TextInput'
import { Popup } from './Popup'
import style from './searchPanel.module.scss'

export function SearchPanel() {
  const [searchValue, setSearchValue] = useState('')
  const [visiblePopup, setVisiblePopup] = useState(false)

  const popupRef = useRef(null)
  const searchRef = useRef(null)

  const dispatch = useDispatch()

  const isLoaded = useSelector((state) => state.productsFastAccess.isLoaded)
  const products = useSelector((state) => state.productsFastAccess.products)
  const currentPage = useSelector((state) => state.productsSearch.currentPage)

  const handleSearchValue = (text) => {
    setSearchValue(text.replace(' ', '&'))
  }

  const handleSearch = () => {
    if (searchValue) {
      dispatch(
        fetchProductsSearch({
          filter: `&search=${searchValue}`,
          limit: 8,
          page: 1,
        })
      )
      dispatch(setCurrentPage(1))
      setVisiblePopup(false)
    }
    window.scrollTo(0, 0)
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
    document.body.addEventListener('click', handleOutsideClick)

    return () => document.body.removeEventListener('click', handleOutsideClick)
  }, [])

  useEffect(() => {
    if (searchValue) {
      dispatch(
        fetchProductsFastAccess({
          filter: `&search=${searchValue}`,
          limit: 4,
          page: 1,
        })
      )
      dispatch(setCurrentPage(1))
    }
  }, [dispatch, searchValue])

  useEffect(() => {
    if (searchValue) {
      dispatch(
        fetchProductsSearch({
          filter: `&search=${searchValue}`,
          limit: 8,
          page: currentPage,
        })
      )
    }
    window.scrollTo(0, 0)
  }, [currentPage])

  return (
    <div className={style.search}>
      {/* <FontAwesomeIcon className={style.search__inputIcon} icon={faLocationDot} size="xl" /> */}
      <TextInput
        handleSearchValue={handleSearchValue}
        iconUrl={'/images/header/search.svg'}
        ref={searchRef}
      />
      <ButtonFind
        classNames={style.search__btn}
        handleClick={handleSearch}
        icon="search"
        label="Find Food"
      />
      <Popup isLoaded={isLoaded} list={products} ref={popupRef} show={visiblePopup} />
    </div>
  )
}
