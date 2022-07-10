/* eslint-disable react/display-name */
import cn from 'classnames';
import React from 'react';
import ReactSelect, { Props as ReactSelectProps } from 'react-select';
import 'react-widgets/styles.css';
import { BibleBook } from '../../data/bible-books';
import styles from './BookCombobox.module.css';

interface Props {
  onSelect?: (option: any) => void;
}

type NativeAttrs = Omit<ReactSelectProps, keyof Props>;

export type BookComboboxProps = Props & NativeAttrs;

const Select = React.forwardRef<HTMLDivElement, BookComboboxProps>(
  (
    { options, className, onSelect, ...props },
    ref: React.Ref<HTMLDivElement | null>
  ) => {
    return (
      <ReactSelect
        ref={ref as any}
        options={options}
        onChange={(option: any) => onSelect?.(option.value)}
        className={cn(styles.select, className)}
        classNamePrefix="select"
        components={{ DropdownIndicator: null }}
        {...props}
      />
    );
  }
);

export default Select;
