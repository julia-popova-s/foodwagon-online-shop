import { useEffect } from 'react';

export const useDisableBodyScroll = (open: boolean) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0';
    }
  }, [open]);
};
