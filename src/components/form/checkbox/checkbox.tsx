import React, { FC } from 'react';
import styles from './checkbox.module.scss';

interface ICheckboxProps {
  id: string;
  label: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: FC<ICheckboxProps> = ({ id, label, checked, onChange }: ICheckboxProps) => {
  return (
    <div className={styles.wrapper}>
      <input className={styles.checkbox} type={'checkbox'} id={id} checked={checked} onChange={onChange} />
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
