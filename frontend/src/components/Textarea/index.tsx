import React, { TextareaHTMLAttributes } from 'react';

import styles from './Textarea.module.sass';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  containerClass?: string;
  textareaWrapperClass?: string;
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  name,
  label,
  containerClass,
  textareaWrapperClass,
  className,
}) => {
  return (
    <div className={`${styles.textareaContainer} ${containerClass}`}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <div className={`${styles.textareaField} ${textareaWrapperClass}`}>
        <textarea
          id={name}
          name={name}
          className={`${styles.textarea} ${className}`}
        />
      </div>
    </div>
  );
};

export default Textarea;
