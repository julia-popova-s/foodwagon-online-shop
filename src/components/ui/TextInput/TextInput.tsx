import cn from 'classnames';
import debounce from 'lodash.debounce';
import {
  ChangeEvent,
  KeyboardEvent,
  PropsWithChildren,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ReactSVG } from 'react-svg';

import style from './textInput.module.scss';

type TextInputProps = {
  address?: string;
  classNames?: string;
  handleKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  handleSearchValue: (text: string) => void;
  iconUrl?: string;
  placeholder: string;
};

export const TextInput = forwardRef<HTMLDivElement, PropsWithChildren<TextInputProps>>(
  ({ address, children, classNames, handleKeyDown, handleSearchValue, iconUrl, placeholder }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [value, setValue] = useState<string>('');

    const handleKeyDeleteDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Delete') {
        event.preventDefault();
        handleClickClear();
      }
    };

    const handleClickClear = () => {
      setValue('');
      handleSearchValue('');
      inputRef.current?.focus();
    };

    const updateSearchValue = useCallback(
      debounce((str: string) => {
        handleSearchValue(str);
      }, 500),
      [],
    );

    const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      updateSearchValue(e.target.value);
    };

    useEffect(() => {
      if (address) {
        setValue(address);
      }
    }, [address]);

    return (
      <div className={cn(style.search, classNames)} ref={ref}>
        <input
          onKeyDown={(e) => {
            if (!!handleKeyDown) handleKeyDown(e);
            handleKeyDeleteDown(e);
          }}
          autoComplete="off"
          className={style.search__input}
          maxLength={150}
          name="find"
          onChange={handleChangeValue}
          placeholder={placeholder}
          ref={inputRef}
          type="text"
          value={value}
        />

        {value && (
          <button className={style.search__clearBtn} onClick={handleClickClear}>
            <ReactSVG
              className={style.search__clearIcon}
              src={`${process.env.PUBLIC_URL}/images/ui/clear_icon.svg`}
              wrapper="span"
            />
          </button>
        )}

        {children}

        {iconUrl && (
          <ReactSVG className={style.search__inputIcon} src={`${process.env.PUBLIC_URL}${iconUrl}`} wrapper="span" />
        )}
      </div>
    );
  },
);
