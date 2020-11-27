/* eslint-disable no-unused-expressions */
import React, { useRef, useEffect } from 'react';
import Select, { OptionTypeBase, Props as SelectProps } from 'react-select';
import { useField } from '@unform/core';

import styles from './ReactSelect.module.sass';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
}

const ReactSelect: React.FC<Props> = ({ name, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
      setValue: (ref: any, value: any) => {
        if (rest.isMulti && Array.isArray(value)) {
          const items = ref?.props?.options?.filter((option: any) =>
            value.includes(option.value),
          );
          ref?.select.setValue(items);
        } else {
          const item = ref?.props?.options?.filter(
            (option: any) => option.value === value,
          );
          if (item && item.length > 0) {
            ref?.select?.setValue(item);
          }
        }
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Select
      defaultValue={defaultValue}
      ref={selectRef}
      className={styles.reactSelectContainer}
      classNamePrefix="reactSelect"
      {...rest}
    />
  );
};

export default ReactSelect;
