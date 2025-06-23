import { JSX } from 'react';
import { FaCheck } from 'react-icons/fa';
import styles from './colorPicker.module.scss';

interface ColorPickerProps {
  colors: string[];
  selectedColor: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ colors, selectedColor, onChange }: ColorPickerProps): JSX.Element {
  return (
    <ul className={styles['color-list']}>
      {colors.map((color) => (
        <li key={color} className={styles['color-list_item']} onClick={() => onChange(color)}>
          <span className={styles.circle} style={{ backgroundColor: color }}>
            {color === selectedColor ? <FaCheck size={22} color={'#7b7b7b'} /> : ''}
          </span>
        </li>
      ))}
    </ul>
  );
}
