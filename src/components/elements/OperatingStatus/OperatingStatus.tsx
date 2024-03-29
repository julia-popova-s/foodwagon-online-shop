import cn from 'classnames';
import { FC } from 'react';

import style from './operatingStatus.module.scss';

type OperatingStatusProps = {
  classNames?: string;
  isClosed: boolean;
  isOpened: boolean;
};

export const OperatingStatus: FC<OperatingStatusProps> = ({ classNames, isClosed, isOpened }) => {
  return (
    <div
      className={cn(classNames, style.text, {
        [style.theme]: isClosed,
      })}
    >
      {isClosed && 'Closed Now'}
      {isOpened && 'Open Now'}
    </div>
  );
};
