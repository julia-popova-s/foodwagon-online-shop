import cn from 'classnames';
import { ReactSVG } from 'react-svg';

import style from './buttonSlider.module.scss';

const arrows = {
  arrowLeftSrc: '/images/ui/arrow_left.svg',
  arrowRightSrc: '/images/ui/arrow_right.svg',
};

export function ButtonSlider({ classNames, onClick, type }) {
  return (
    <button className={cn(style.buttonSlider, classNames)} onClick={onClick}>
      {type === 'left' ? (
        <ReactSVG className={style.buttonSlider__arrow} src={`${process.env.PUBLIC_URL}${arrows.arrowLeftSrc}`} />
      ) : (
        <ReactSVG className={style.buttonSlider__arrow} src={`${process.env.PUBLIC_URL}${arrows.arrowRightSrc}`} />
      )}
    </button>
  );
}
