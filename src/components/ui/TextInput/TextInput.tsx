/* eslint-disable max-len */
import cn from 'classnames';
import debounce from 'lodash.debounce';
import { forwardRef, useCallback, useRef, useState } from 'react';
import { ChangeEvent, PropsWithChildren } from 'react';
import { ReactSVG } from 'react-svg';

import style from './textInput.module.scss';

type TextInputProps = {
  classNames?: string;
  handleSearchValue: (text: string) => void;
  iconUrl?: string;
};

export const TextInput = forwardRef<HTMLDivElement, PropsWithChildren<TextInputProps>>(
  ({ children, classNames, handleSearchValue, iconUrl }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState<string>('');

    const handleClickClear = () => {
      setValue('');
      handleSearchValue('');
      inputRef.current?.focus();
    };

    const updateSearchValue = useCallback(
      debounce((str: string) => {
        handleSearchValue(str);
      }, 300),
      [],
    );

    const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      updateSearchValue(e.target.value);
    };

    return (
      <div className={cn(style.search, classNames)} ref={ref}>
        <input
          autoComplete="off"
          className={style.search__input}
          name="find"
          onChange={handleChangeValue}
          placeholder="Enter your request"
          ref={inputRef}
          type="text"
          value={value}
        />

        {value && (
          <svg
            className={style.search__clearIcon}
            onClick={handleClickClear}
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fillRule="evenodd" id="Fail">
              <path d="m16 3a13 13 0 1 1 -13 13 13.006 13.006 0 0 1 13-13zm0-2a15 15 0 1 0 15 15 15.007 15.007 0 0 0 -15-15z"></path>
              <path d="m14.586 16-4.293 4.293a1 1 0 0 0 1.414 1.414l4.293-4.293 4.293 4.293a1 1 0 1 0 1.414-1.414l-4.293-4.293 4.293-4.293a1 1 0 0 0 -1.414-1.414l-4.293 4.293-4.293-4.293a1 1 0 0 0 -1.414 1.414z"></path>
            </g>
          </svg>
        )}

        {children}

        {iconUrl && (
          <ReactSVG className={style.search__inputIcon} src={`${process.env.PUBLIC_URL}${iconUrl}`} wrapper="span" />
        )}
      </div>
    );
  },
);
