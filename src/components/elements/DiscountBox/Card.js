import style from './card.module.scss'

export function Card({ discount, image, restaurantName }) {
  return (
    <div className={style.card}>
      <div className={style.card__up}>
        <img
          alt={restaurantName}
          className={style.card__image}
          src={process.env.PUBLIC_URL + image}
        />
        {discount && discount ? (
          <div className={style.card__discount}>
            {discount}
            <div className={style.card__discount_size}>%</div>
            <div className={style.card__discount_off}>off</div>
          </div>
        ) : null}
      </div>
      <p className={style.card__name}>{restaurantName}</p>
      <p className={style.card__text}>6 Days Remaining</p>
    </div>
  )
}
