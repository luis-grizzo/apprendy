import React, { useState, useCallback, InputHTMLAttributes } from 'react';

import styles from './Switch.module.sass';

interface ISwtichProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  isChecked?: boolean;
  className?: string;
}

const Switch: React.FC<ISwtichProps> = ({
  name,
  label,
  isChecked,
  className,

  ...rest
}) => {
  const [checked, setChecked] = useState(Boolean(isChecked));

  const handleCheck = useCallback(() => {
    setChecked(!checked);
  }, [checked]);

  return (
    <div className={styles.wrapper}>
      <input
        id={name}
        name={name}
        className={`${styles.switch} ${className}`}
        type="checkbox"
        defaultChecked={checked}
        onClick={handleCheck}
        {...rest}
      />
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
    </div>
  );
};

export default Switch;
