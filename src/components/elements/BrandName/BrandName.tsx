import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import style from './brandName.module.scss';

type BrandNameProps = { classNames?: string; id: string; restaurantId: string; restaurantName: string };

export const BrandName = ({ classNames, id, restaurantId, restaurantName }: BrandNameProps) => {
  return (
    <div className={cn(style.name, classNames)}>
      <FontAwesomeIcon className={style.name__icon} icon={faLocationDot} />
      <Link className={style.name__link} to={`/restaurant/${restaurantId}/product/${id}`}>
        {restaurantName}
      </Link>
    </div>
  );
};
