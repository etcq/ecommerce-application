import styles from './input.module.scss';
import React, { FC } from 'react';

interface IProps {
  type?: 'text' | 'email' | 'password' | 'date';
  label?: string;
  id?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  wrapperClassName: string;
  error?: string;
}

const Input: FC<IProps> = ({ type = 'text', label, id, placeholder, onChange, wrapperClassName, error, ...props }) => {
  return (
    <div className={`${styles.wrapper} ${styles[wrapperClassName]}`}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}

      <input
        className={styles.input}
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      ></input>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default Input;
