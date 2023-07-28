import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

import { ButtonFind } from '../../ui/ButtonFind'
import style from './searchPanel.module.scss'

export function SearchPanel() {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form className={style.searchPanel} onSubmit={handleSubmit}>
      <input
        className={style.searchPanel__input}
        name="find"
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter Your Address"
        type="text"
        value={text}
      />

      <FontAwesomeIcon className={style.searchPanel__inputIcon} icon={faLocationDot} size="xl" />

      <ButtonFind classNames={style.searchPanel__btn} icon="search" label="Find Food" />
    </form>
  )
}
