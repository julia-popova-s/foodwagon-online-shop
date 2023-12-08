import { FC } from 'react';
import { ReactSVG } from 'react-svg';

import style from './orderStep.module.scss';

type OpderStepProps = {
  description: string;
  imageSrc: string;
  label: string;
};

export const OrderStep: FC<OpderStepProps> = ({ description, imageSrc, label }) => {
  return (
    <div className={style.orderStep}>
      <ReactSVG className={style.orderStep__icon} src={process.env.PUBLIC_URL + imageSrc} wrapper="div" />

      <p className={style.orderStep__label}>{label}</p>
      <p className={style.orderStep__descr}>{description}</p>
    </div>
  );
};
