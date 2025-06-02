import React, { useEffect } from 'react';
import styles from './toast.module.scss';

interface IToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<IToastProps> = ({ message, duration = 3000, onClose }: IToastProps) => {
  useEffect((): (() => void) => {
    const timer = setTimeout(onClose, duration);
    return (): void => clearTimeout(timer);
  }, [duration, onClose]);

  return <div className={styles.toast}>{message}</div>;
};
