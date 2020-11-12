import React, { useState, useCallback } from 'react';

import styles from './Switch.module.sass';

interface ISwtichProps {
  label: string;
  isChecked?: boolean;
  className?: string;
}

const Switch: React.FC<ISwtichProps> = ({ label, isChecked, className }) => {
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
        checked={checked}
        onClick={handleCheck}
      />
      <label htmlFor="switch" className={styles.label}>
        {label}
      </label>
    </div>
  );
};

export default Switch;
