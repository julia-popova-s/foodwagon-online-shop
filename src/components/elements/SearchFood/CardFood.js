import style from './cardFood.module.scss'

export function CardFood({ classNames, imageSrc, name, onClickCategory }) {
  return (
    <div className={(classNames, style.cardFoodBlock)} onClick={onClickCategory}>
      <div className={style.cardFood__up}>
        <img alt={name} className={style.cardFood__image} src={process.env.PUBLIC_URL + imageSrc} />
      </div>
      <p className={style.cardFood__label}>{name}</p>
    </div>
  )
}
