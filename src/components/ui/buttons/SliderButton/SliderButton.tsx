import cn from 'classnames';
import { FC } from 'react';
import { ReactSVG } from 'react-svg';

import style from './sliderButton.module.scss';

type Arrow = {
  arrowLeftSrc: string;
  arrowRightSrc: string;
};

const arrows: Arrow = {
  arrowLeftSrc: '/images/ui/arrow_left.svg',
  arrowRightSrc: '/images/ui/arrow_right.svg',
};

type SliderButtonProps = {
  classNames?: string;
  handleClick?: () => void;
  type: 'left' | 'right';
};

export const SliderButton: FC<SliderButtonProps> = ({ classNames, handleClick, type }) => {
  return (
    <button className={cn(style.sliderButton, classNames)} onClick={handleClick}>
      {type === 'left' ? (
        <ReactSVG className={style.sliderButton__arrow} src={`${process.env.PUBLIC_URL}${arrows.arrowLeftSrc}`} />
      ) : (
        <ReactSVG className={style.sliderButton__arrow} src={`${process.env.PUBLIC_URL}${arrows.arrowRightSrc}`} />
      )}
    </button>
  );
};
