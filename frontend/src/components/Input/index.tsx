import React, {
  InputHTMLAttributes,
  MouseEventHandler,
  OptionHTMLAttributes,
  useEffect,
  useRef,
} from 'react';
import { MdError } from 'react-icons/md';
import { IconBaseProps } from 'react-icons/lib';
import { useField } from '@unform/core';

import Button from '../Button';

import styles from './Input.module.sass';
import Select from '../Select';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  containerClass?: string;
  inputWrapperClass?: string;
  className?: string;
  select?: boolean;
  selectOptions?: Array<OptionHTMLAttributes<HTMLOptionElement>>;
  selectClass?: string;
  button?: boolean;
  buttonType?: 'button' | 'submit' | 'reset' | undefined;
  buttonClass?: string;
  buttonIcon?: React.ComponentType<IconBaseProps>;
  buttonOnCLick?: MouseEventHandler;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  containerClass,
  inputWrapperClass,
  className,
  select,
  selectOptions,
  selectClass,
  button,
  buttonType,
  buttonClass,
  buttonIcon: ButtonIcon,
  buttonOnCLick,
  ...rest
}) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <div className={`${styles.inputContainer} ${containerClass}`}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <div className={`${styles.inputField} ${inputWrapperClass}`}>
        <input
          id={name}
          name={name}
          ref={inputRef}
          defaultValue={defaultValue}
          className={`${styles.input} ${className}  ${error && styles.error}`}
          {...rest}
        />
        {select && (
          <Select
            name={name}
            selectWrapperClass={styles.selectField}
            className={`${styles.select} ${selectClass}`}
            options={selectOptions}
          />
        )}
        {button && (
          <Button
            type={buttonType}
            className={`${styles.button} ${buttonClass}`}
            onClick={buttonOnCLick}
          >
            {ButtonIcon && <ButtonIcon className={styles.buttonIcon} />}
          </Button>
        )}
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

export default Input;
