import React, { useState, useCallback, InputHTMLAttributes } from 'react';

import styles from './Switch.module.sass';

interface ISwtichProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isChecked?: boolean;
  className?: string;
}

const Switch: React.FC<ISwtichProps> = ({
  label,
  isChecked,
  className,
  ...rest
}) => {
  const [checked, setChecked] = useState(!!isChecked);

  const handleCheck = useCallback(() => {
    setChecked(!checked);
  }, [checked]);

  return (
    <div className={styles.wrapper}>
      <input
        name="switch"
        className={`${styles.switch} ${className}`}
        type="checkbox"
        defaultChecked={checked}
        onClick={handleCheck}
        {...rest}
      />
      <label htmlFor="switch" className={styles.label}>
        {label}
      </label>
    </div>
  );
};

export default Switch;
