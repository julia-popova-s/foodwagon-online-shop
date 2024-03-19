/* eslint-disable max-len */
import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { CardList } from './CardList';
import style from './details.module.scss';

export type CardItem = { description: string; food: string; id: string; imageSrc: string; link: string; title: string };

const CARDS: CardItem[] = [
  {
    description:
      "Enjoy the large size of sandwiches. Complete perfect slice of sandwiches. Crispy Chicken Sandwich: Beats anything from a fast-food joint! A total flavor-bomb and so moist & juicy. You'll love the bold spices!",
    food: 'Crispy Sandwiches',
    id: uuidv4(),
    imageSrc: '/images/cards-big/1.png',
    link: 'restaurant/28d1abb8-f79f-4fd7-bb8d-09b5dd6af441/product/71b094c0-6cbf-4995-a704-d0be93939cfe',
    title: 'Best deals',
  },
  {
    description:
      'Get the best fried chicken smeared with a lip smacking lemon chili flavor. Check out best deals for fried chicken.',
    food: 'Fried Chicken',
    id: uuidv4(),
    imageSrc: '/images/cards-big/2.png',
    link: 'restaurant/333f1471-d10f-4b1d-a654-d3c070cb3500/product/cdb1116e-e6b4-44d4-b97f-c6ccc5eda33a',
    title: 'Celebrate parties with',
  },
  {
    description:
      'Pair up with a friend and enjoy the hot and crispy pizza pops. Try it with the best deals. You want the best pizza to be cooked to a crisp. The cheese should be melted, the crust should have some crunch to it, the whole thing should be served piping hot.',
    food: 'Pizza?',
    id: uuidv4(),
    imageSrc: '/images/cards-big/3.png',
    link: 'restaurant/c8cf7e48-a4c2-4ef8-a2bd-adeb3d7b2ad5/product/5452bd6c-654a-46d7-830a-e3b5b673de64',
    title: 'Wanna eat hot & spicy',
  },
];

export const Details: FC = () => {
  return (
    <div className={style.cardBigList}>
      <div className="container">
        <CardList items={CARDS} />
      </div>
    </div>
  );
};
