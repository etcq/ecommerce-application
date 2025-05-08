import styles from './burger-menu.module.scss';

export default function BurgerMenu(props: { open: boolean }): React.JSX.Element {
  return (
    <div className={`${styles['burger-menu']} ${props.open ? styles['burger-menu__open'] : ''}`}>
      <ul className={styles['burger-menu__list']}>
        <li className="burger-menu__list_item">Home</li>
        <li className="burger-menu__list_item">Catalog</li>
        <li className="burger-menu__list_item">About Us</li>
        <li className="burger-menu__list_item">Log in</li>
        <li className="burger-menu__list_item">Registration</li>
      </ul>
    </div>
  );
}
