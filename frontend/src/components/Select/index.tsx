import React, { OptionHTMLAttributes, SelectHTMLAttributes } from 'react';
import { MdArrowDropDown } from 'react-icons/md';

import styles from './Select.module.sass';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<OptionHTMLAttributes<HTMLOptionElement>> | undefined;
  containerClass?: string;
  selectWrapperClass?: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  containerClass,
  selectWrapperClass,
  className,
  ...rest
}) => {
  return (
    <div className={`${styles.selectContainer} ${containerClass}`}>
      {label && (
        <label htmlFor={label} className={styles.label}>
          {label}
        </label>
      )}
      <div className={`${styles.selectField} ${selectWrapperClass}`}>
        <select
          id={label}
          className={`${styles.select} ${className}`}
          {...rest}
        >
          {options &&
            options.map((option, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
        <MdArrowDropDown className={styles.icon} />
      </div>
    </div>
  );
};

export default Select;
