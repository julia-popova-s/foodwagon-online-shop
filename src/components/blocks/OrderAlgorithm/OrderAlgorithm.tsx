import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { OrderStep } from '../../elements/OrderStep';
import style from './orderAlgorithm.module.scss';

type AlgorithmStep = {
  description: string;
  id: string;
  imageSrc: string;
  label: string;
};

const algorithm: AlgorithmStep[] = [
  {
    description: 'Choose the location where your food will be delivered.',
    id: uuidv4(),
    imageSrc: '/images/order-algorithm/map.svg',
    label: 'Select location',
  },
  {
    description: 'Check over hundreds of menus to pick your favorite food',
    id: uuidv4(),
    imageSrc: '/images/order-algorithm/menu.svg',
    label: 'Choose order',
  },
  {
    description: "It's quick, safe, and simple. Select several methods of payment",
    id: uuidv4(),
    imageSrc: '/images/order-algorithm/invoice.svg',
    label: 'Pay advanced',
  },
  {
    description: 'Food is made and delivered directly to your home.',
    id: uuidv4(),
    imageSrc: '/images/order-algorithm/donut.svg',
    label: 'Enjoy meals',
  },
];

export const OrderAlgorithm: FC = () => {
  return (
    <section className={style.orderAlgorithmBlock}>
      <div className="container">
        <div className={style.orderAlgorithm}>
          <h2 className={style.orderAlgorithm__title}>How does it work</h2>

          <div className={style.orderAlgorithm__list}>
            {algorithm &&
              algorithm.map(({ id, label, ...others }) => {
                return <OrderStep key={`${label}_${id}`} label={label} {...others} />;
              })}
          </div>
        </div>
      </div>
    </section>
  );
};
