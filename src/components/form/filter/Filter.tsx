import React from 'react';
import styles from './filter.module.scss';

interface IProps {
  title: string;
  children?: React.ReactNode;
}

export const Filter: React.FC<IProps> = ({ title, children }: IProps) => {
  return (
    <div className={styles.wrapper}>
      <h3>{title}</h3>
      <div className={styles.box}>{children}</div>
    </div>
  );
};
