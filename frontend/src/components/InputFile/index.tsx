/* eslint-disable no-param-reassign */
import React, {
  InputHTMLAttributes,
  useEffect,
  useCallback,
  useRef,
  useState,
  ChangeEvent,
} from 'react';
import { useField } from '@unform/core';
import { MdImage, MdError } from 'react-icons/md';

import Button from '../Button';

import styles from './InputFile.module.sass';

import defaultImage from '../../assets/noImageAvaible.jpg';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerClass?: string;
  label?: string;
  previewSrc?: string;
  inputWrapperClass?: string;
  className?: string;
}

const InputFile: React.FC<InputProps> = ({
  name,
  label,
  previewSrc,
  containerClass,
  inputWrapperClass,
  className,
  ...rest
}) => {
  const inputRef: any = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [preview, setPreview] = useState(defaultValue);
  const handlePreview = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPreview(null);
    }
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
  }, []);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      clearValue(ref: HTMLInputElement) {
        ref.value = '';
        setPreview(null);
      },
      setValue(_: HTMLInputElement, value: string) {
        setPreview(value);
      },
    });
  }, [fieldName, registerField]);

  const openFilePicker = () => {
    if (inputRef !== null) {
      inputRef.current.click();
    }
  };
  return (
    <>
      <div className={`${styles.inputContainer} ${containerClass}`}>
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
        )}
        <div
          className={`${styles.inputField} ${
            error && styles.error
          } ${inputWrapperClass}`}
        >
          <input
            id={name}
            type="file"
            name={name}
            ref={inputRef}
            onChange={handlePreview}
            accept="image/*"
            className={`${styles.inputFile} ${className}`}
            {...rest}
          />
          <div className={styles.preview}>
            <img
              src={preview || previewSrc || defaultImage}
              alt={name}
              className={styles.img}
            />
          </div>
          <Button
            icon={MdImage}
            className={styles.button}
            onClick={openFilePicker}
          >
            Escolher imagem
          </Button>
        </div>
        {error && (
          <div className={styles.errorMessage}>
            <MdError className={styles.icon} />
            <p className={styles.text}>{error}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default InputFile;
