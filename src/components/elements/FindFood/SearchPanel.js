import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { ButtonFind } from '../../ui/ButtonFind'
import { Search } from './Search'
import style from './searchPanel.module.scss'

export function SearchPanel() {
  const dispatch = useDispatch()

  const handleSearch = () => {
    // dispatch(
    //   fetchProducts({
    //     filter: `&search=${value}`,
    //     limit: 8,
    //   })
    // )
  }

  return (
    <div className={style.searchPanel}>
      <Search />

      <Link to={'search'}>
        <ButtonFind
          classNames={style.searchPanel__btn}
          handleClick={handleSearch}
          icon="search"
          label="Find Food"
        />
      </Link>
    </div>
  )
}
