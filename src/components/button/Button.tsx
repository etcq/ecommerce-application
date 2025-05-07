import styles from './button.module.scss';
import { ButtonHTMLAttributes, FC } from 'react';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'large' | 'medium' | 'small' | 'x-small';
}

const Button: FC<IProps> = ({ type, size, children, ...props }) => {
  return (
    <button {...props} type={type} className={`${styles.button} ${styles[size]}`}>
      {children}
    </button>
  );
};

export default Button;
