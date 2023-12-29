import { useEffect, useRef } from 'react';

export const useOutsideClick = (handleClose: () => void) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        handleClose();
      }
      return;
    };

    document.body.addEventListener('mousedown', handleOutsideClick);

    return () => document.body.removeEventListener('mousedown', handleOutsideClick);
  }, [handleClose]);

  return ref;
};
