import React, { ButtonHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons/lib';

import styles from './Button.module.sass';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ComponentType<IconBaseProps>;
  variant?: 'contrast' | 'error' | 'outline';
  size?: 'large';
  className?: string;
  iconClass?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  className,
  iconClass,
  children,
  icon: Icon,
  ...rest
}) => {
  return (
    <button
      className={`${variant === 'contrast' ? styles.contrast : ''} ${
        variant === 'outline' ? styles.outline : ''
      } ${variant === 'error' ? styles.error : ''} ${
        size === 'large' ? styles.large : ''
      } ${styles.button} ${className}`}
      type="button"
      {...rest}
    >
      {Icon && (
        <Icon
          className={`${styles.icon} ${iconClass} ${
            !children ? styles.noMargin : ''
          }`}
        />
      )}
      {children}
    </button>
  );
};

export default Button;
