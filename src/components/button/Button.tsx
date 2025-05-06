import styles from './button.module.scss';
import { FC } from 'react';

interface IProps {
  title: string;
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
  disabled?: boolean;
  style?: (keyof typeof styles)[];
}

const Button: FC<IProps> = ({ title, type = 'button', onClick, disabled, style }) => {
  const classNames = style?.map((className) => styles[className]).join(' ');

  return (
    <button className={classNames} type={type} onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
};

export default Button;
