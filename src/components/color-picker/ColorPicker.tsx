import { JSX, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import styles from './color-picker.module.scss';

export default function ColorPicker({ colors }: { colors: string[] }): JSX.Element {
  const [checkedColor, setCheckedColor] = useState('');
  return (
    <ul className={styles['color-list']}>
      {colors.map((color) => (
        <li key={color} className={styles['color-list_item']} onClick={() => setCheckedColor(color)}>
          <span className={styles.circle} style={{ backgroundColor: color }}>
            {color === checkedColor ? <FaCheck size={22} color={'#7b7b7b'} /> : ''}
          </span>
        </li>
      ))}
    </ul>
  );
}
