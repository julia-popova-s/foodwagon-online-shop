import { useEffect } from 'react';

export const useOutsideClick = (
  callback: (e: MouseEvent) => boolean,
  handleOpen: () => void,
  handleClose: () => void,
) => {
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (callback(e)) {
        handleOpen();
      } else {
        handleClose();
      }
      return;
    };

    document.body.addEventListener('click', handleOutsideClick);

    return () => document.body.removeEventListener('click', handleOutsideClick);
  }, [handleOpen, handleClose, callback]);
};
