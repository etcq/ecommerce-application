import styles from './input.module.scss';
import React, { FC, InputHTMLAttributes } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'email' | 'password' | 'date';
  label?: string;
  id?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  wrapperClassName?: string;
  error?: string;
}

const Input: FC<IProps> = ({ type = 'text', label, id, placeholder, onChange, wrapperClassName, error, ...props }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility: () => void = (): void => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={`${styles.wrapper} ${wrapperClassName ? styles[wrapperClassName] : ''}`}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}

      <input
        {...props}
        className={styles.input}
        type={(type === 'password' && (showPassword ? 'text' : 'password')) || type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
      ></input>

      <span className={styles.error}>{error}</span>

      {type === 'password' && (
        <button type="button" className={styles.visibility} onClick={togglePasswordVisibility}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  );
};

export default Input;
