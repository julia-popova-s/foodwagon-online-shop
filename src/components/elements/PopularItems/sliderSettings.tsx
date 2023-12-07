import cn from 'classnames';

import { SliderButton } from '../../ui/buttons/SliderButton';
import style from './popularItems.module.scss';

export const sliderSettings = {
  dots: false,
  infinite: true,
  nextArrow: <SliderButton classNames={cn(style.popularItems__btn, style.popularItems__btn_right)} type={'right'} />,
  prevArrow: <SliderButton classNames={cn(style.popularItems__btn, style.popularItems__btn_left)} type={'left'} />,
  responsive: [
    {
      breakpoint: 1770,
      settings: {
        dots: false,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1480,
      settings: {
        dots: false,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1180,
      settings: {
        dots: false,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 760,
      settings: {
        dots: false,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 1,
      },
    },
  ],
  slidesToScroll: 1,
  slidesToShow: 5,
  speed: 500,
};
