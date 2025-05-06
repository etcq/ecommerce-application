import styles from './input.module.scss';
import { FC } from 'react';

interface IProps {
  type?: 'text' | 'email' | 'password' | 'date';
  label?: string;
  id?: string;
  placeholder?: string;
  onChange?: () => void;
  style?: (keyof typeof styles)[];
}

const Input: FC<IProps> = ({ type = 'text', label, id, placeholder, onChange, style }) => {
  const classNames = style?.map((className) => styles[className]).join(' ');

  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}

      <input className={classNames} type={type} id={id} placeholder={placeholder} onChange={onChange}></input>
    </div>
  );
};

export default Input;
