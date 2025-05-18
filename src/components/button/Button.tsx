import styles from './button.module.scss';
import { ButtonHTMLAttributes, FC } from 'react';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'large' | 'medium' | 'small' | 'x-small';
}

const Button: FC<IProps> = ({ type, size, children, className, ...props }) => {
  return (
    <button {...props} type={type} className={`${styles.button} ${styles[size]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
