import { useEffect, useRef } from 'react';

type Ref = HTMLButtonElement | HTMLDivElement | HTMLElement | HTMLSpanElement;

export const useOutsideClick = (handleOpen: () => void, handleClose: () => void) => {
  const ref = useRef<Ref>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current?.contains(e.target as Node)) {
        handleOpen();
      } else {
        handleClose();
      }
      return;
    };

    document.body.addEventListener('mousedown', handleOutsideClick);

    return () => document.body.removeEventListener('mousedown', handleOutsideClick);
  }, [handleOpen, handleClose]);

  return ref;
};
