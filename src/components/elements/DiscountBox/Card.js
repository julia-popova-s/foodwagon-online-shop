import styles from './card.module.scss'

export function Card({ discount, image, restaurantName }) {
  return (
    <div className={styles.card}>
      <div className={styles.card__up}>
        <img
          alt={restaurantName}
          className={styles.card__image}
          src={`${process.env.PUBLIC_URL}${image}`}
        />
        {discount && discount ? (
          <div className={styles.card__discount}>
            {discount}
            <div className={styles.card__discount_size}>%</div>
            <div className={styles.card__discount_off}>off</div>
          </div>
        ) : null}
      </div>
      <p className={styles.card__name}>{restaurantName}</p>
      <p className={styles.card__text}>6 Days Remaining</p>
    </div>
  )
}
