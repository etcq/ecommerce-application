import { JSX, MouseEvent, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import styles from './color-picker.module.scss';

export default function ColorPicker({ colors }: { colors: string[] }): JSX.Element {
  const [checkedColor, setCheckedColor] = useState<string | null>(null);
  const checkColor = (event: MouseEvent<HTMLLIElement>): void => {
    if (event.currentTarget) {
      const target = event.currentTarget;
      const color = target.getAttribute('id');
      setCheckedColor(color);
    }
  };
  return (
    <ul className={styles['color-list']}>
      {colors.map((color) => (
        <li
          key={color}
          className={styles['color-list_item']}
          id={color}
          onClick={(event) => {
            checkColor(event);
          }}
        >
          <span className={styles.circle} style={{ backgroundColor: color }}>
            {color === checkedColor ? <FaCheck size={22} color={'#7b7b7b'} /> : ''}
          </span>
        </li>
      ))}
    </ul>
  );
}
