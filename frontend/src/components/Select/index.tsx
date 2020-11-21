import React, {
  OptionHTMLAttributes,
  SelectHTMLAttributes,
  useRef,
  useEffect,
} from 'react';
import { useField } from '@unform/core';
import { MdArrowDropDown, MdError } from 'react-icons/md';

import styles from './Select.module.sass';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  options: Array<OptionHTMLAttributes<HTMLOptionElement>> | undefined;
  containerClass?: string;
  selectWrapperClass?: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  name,
  label,
  options,
  containerClass,
  selectWrapperClass,
  className,
  ...rest
}) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    });
  }, [fieldName, registerField, rest.multiple]);

  return (
    <div className={`${styles.selectContainer} ${containerClass}`}>
      {label && (
        <label htmlFor={label} className={styles.label}>
          {label}
        </label>
      )}
      <div
        className={`${styles.selectField} ${
          error && styles.error
        } ${selectWrapperClass}`}
      >
        <select
          defaultValue={defaultValue}
          ref={selectRef}
          id={label}
          className={`${styles.select} ${error && styles.error} ${className}`}
          {...rest}
        >
          <option value={-1}>Selecione uma opção</option>
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
      {error && (
        <div className={styles.errorMessage}>
          <MdError className={styles.icon} />
          <p className={styles.text}>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Select;
