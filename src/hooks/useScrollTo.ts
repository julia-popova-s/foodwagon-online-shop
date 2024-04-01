import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollTo = (left?: number, top?: number, page?: number) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      behavior: 'smooth',
      left: left || 0,
      top: top || 0,
    });
  }, [pathname, left, top, page]);
};
