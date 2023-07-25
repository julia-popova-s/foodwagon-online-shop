import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

import { ButtonFind } from '../../ui/ButtonFind'
import styles from './searchPanel.module.scss'

export function SearchPanel() {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className={styles.searchPanel} onSubmit={handleSubmit}>
      <input
        className={styles.searchPanel__input}
        name="find"
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter Your Address"
        type="text"
        value={text}
      />

      <FontAwesomeIcon className={styles.searchPanel__inputIcon} icon={faLocationDot} size="xl" />

      <ButtonFind classNames={styles.searchPanel__btn} icon="search" label="Find Food" />
    </div>
  )
}
