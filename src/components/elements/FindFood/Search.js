import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import debounce from 'lodash.debounce'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { fetchProducts } from '../../../store/reducers/products'
import style from './search.module.scss'

export function Search({ setValue, value }) {
  const [searchValue, setSearchValue] = useState('')
  const inputRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (searchValue)
      dispatch(
        fetchProducts({
          filter: `&search=${searchValue}`,
          limit: 4,
        })
      )
  }, [dispatch, searchValue])

  console.log(searchValue)

  const onClickClear = () => {
    setValue('')
    setSearchValue('')
    inputRef.current.focus()
  }
  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str)
    }, 1000),
    []
  )
  const onChangeValue = (e) => {
    setValue(e.target.value)
    updateSearchValue(e.target.value)
  }
  return (
    <div className={style.search}>
      <input
        className={style.search__input}
        name="find"
        onChange={onChangeValue}
        placeholder="Enter Your Address"
        ref={inputRef}
        type="text"
        value={value}
      />
      <FontAwesomeIcon className={style.search__inputIcon} icon={faLocationDot} size="xl" />

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
    </div>
  )
}
