import cn from 'classnames';
import { ReactSVG } from 'react-svg';

import style from './sliderButton.module.scss';

const arrows = {
  arrowLeftSrc: '/images/ui/arrow_left.svg',
  arrowRightSrc: '/images/ui/arrow_right.svg',
};

export function SliderButton({ classNames, onClick, type }) {
  return (
    <button className={cn(style.sliderButton, classNames)} onClick={onClick}>
      {type === 'left' ? (
        <ReactSVG className={style.sliderButton__arrow} src={`${process.env.PUBLIC_URL}${arrows.arrowLeftSrc}`} />
      ) : (
        <ReactSVG className={style.sliderButton__arrow} src={`${process.env.PUBLIC_URL}${arrows.arrowRightSrc}`} />
      )}
    </button>
  );
}
