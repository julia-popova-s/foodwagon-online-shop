import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchProducts } from '../../../store/reducers/products'
import { ButtonFind } from '../../ui/ButtonFind'
import style from './searchPanel.module.scss'

export function SearchPanel() {
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const dispatch = useDispatch()

  const handleSearch = () => {
    dispatch(
      fetchProducts({
        filter: `&search=${value}`,
        limit: 8,
      })
    )
  }

  return (
    <form className={style.searchPanel} onSubmit={handleSubmit}>
      <input
        className={style.searchPanel__input}
        name="find"
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter Your Address"
        type="text"
        value={value}
      />

      <FontAwesomeIcon className={style.searchPanel__inputIcon} icon={faLocationDot} size="xl" />
      <Link to={'search'}>
        <ButtonFind
          classNames={style.searchPanel__btn}
          handleClick={handleSearch}
          icon="search"
          label="Find Food"
        />
      </Link>
    </form>
  )
}
