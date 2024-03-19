import { FC } from 'react';

import { CardItem } from './Details';
import { DetailsCard } from './DetailsCard';
import style from './cardList.module.scss';

type CardListProps = {
  items: CardItem[];
};

export const CardList: FC<CardListProps> = ({ items }) => {
  return (
    <div className={style.cardList}>
      {items?.length
        ? items.map((item, i) => {
            const { id } = item;
            return <DetailsCard key={id} {...item} flippedСard={(i + 1) % 2 !== 0} />;
          })
        : null}
    </div>
  );
};
