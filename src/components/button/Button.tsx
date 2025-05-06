import styles from './button.module.scss';
import { ButtonHTMLAttributes, FC } from 'react';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: string;
}

const Button: FC<IProps> = ({ type, variant, children, ...props }) => {
  return (
    <button {...props} type={type} className={`${styles.button} ${styles[variant]}`}>
      {children}
    </button>
  );
};

export default Button;
