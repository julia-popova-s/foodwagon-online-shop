import styles from './cardFood.module.scss'

export function CardFood({ classNames, imageSrc, name, onClickCategory }) {
  return (
    <div className={(classNames, styles.cardFoodBlock)} onClick={onClickCategory}>
      <div className={styles.cardFood__up}>
        <img
          alt={name}
          className={styles.cardFood__image}
          src={`${process.env.PUBLIC_URL}${imageSrc}`}
        />
      </div>
      <p className={styles.cardFood__label}>{name}</p>
    </div>
  )
}
