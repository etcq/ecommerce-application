import styles from './input.module.scss';
import { FC } from 'react';

interface IProps {
  type?: 'text' | 'email' | 'password' | 'date';
  label?: string;
  id?: string;
  placeholder?: string;
  onChange?: () => void;
  wrapperClassName: string;
}

const Input: FC<IProps> = ({ type = 'text', label, id, placeholder, onChange, wrapperClassName, ...props }) => {
  return (
    <div className={`${styles.wrapper} ${styles[wrapperClassName]}`}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}

      <input
        {...props}
        className={styles.input}
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
      ></input>
    </div>
  );
};

export default Input;
