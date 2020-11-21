import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';
import { MdImage } from 'react-icons/md';
import { IconBaseProps } from 'react-icons/lib';

import Button from '../Button';

import styles from './InputFile.module.sass';

import defaultImage from '../../assets/noImageAvaible.jpg';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerClass?: string;
  label?: string;
  inputWrapperClass?: string;
  className?: string;
  buttonLabel?: string;
  buttonIcon?: React.ComponentType<IconBaseProps>;
}

const InputFile: React.FC<InputProps> = ({
  name,
  label,
  containerClass,
  inputWrapperClass,
  className,
  buttonLabel,
  buttonIcon: ButtonIcon,
  ...rest
}) => {
  const [imageFile, setImageFile] = useState('');

  const inputRef: any = useRef(null);
  const imgRef: any = useRef(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const openFilePicker = () => {
    if (inputRef !== null) {
      inputRef.current.click();
    }
  };

  const handlePreviewChange = () => {
    const file = inputRef.current.value;

    imgRef.current.src = file;
  };

  return (
    <>
      <div className={`${styles.inputContainer} ${containerClass}`}>
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
        )}
        <div className={`${styles.inputField} ${inputWrapperClass}`}>
          <input
            id={name}
            type="file"
            name={name}
            ref={inputRef}
            onChange={handlePreviewChange}
            value={imageFile}
            className={`${styles.inputFile} ${className}`}
            {...rest}
          />
          <div className={styles.preview}>
            <img
              src={defaultImage}
              alt={name}
              ref={imgRef}
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
      </div>
    </>
  );
};

export default InputFile;
