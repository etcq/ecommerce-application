import { NavLink } from 'react-router';
import styles from './empty-cart.module.scss';

const EmptyCart: React.FC = () => {
  return (
    <div className={styles.message}>
      <div>Looks like you haven't added any items yet.</div>
      <NavLink className={styles.link} to="/product-list">
        Proceed to Catalog
      </NavLink>
    </div>
  );
};

export default EmptyCart;
