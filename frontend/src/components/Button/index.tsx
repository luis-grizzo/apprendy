import React, { ButtonHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons/lib';

import styles from './Button.module.sass';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ComponentType<IconBaseProps>;
  variant?: 'contrast' | 'outline';
  className?: string;
  iconClass?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant,
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
