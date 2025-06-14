import { JSX } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaVk, FaYoutube } from 'react-icons/fa';
import styles from './footer.module.scss';
import { menuDefaultLinks } from '@/constants/constants.ts';
import { FaBitcoin, FaCcMastercard, FaCcPaypal, FaCcVisa } from 'react-icons/fa6';
import NavigationMenu from '@components/nav-menu/NavigationMenu.tsx';

export default function Footer(): JSX.Element {
  const consumerServicesMenu = ['Contact Us', 'Returns Information', 'Shipping Information', 'FAQ', 'Store Locator'];
  const sizingInformationMenu = ['Shoe size guide', 'Shoe width guide', 'How to Measure Yourself'];

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__wrapper}>
        <div className={styles['socials-payment']}>
          <p className={styles.footer__subtitle}>Social Media</p>
          <div className={styles.socials}>
            <a className={styles['socials-payment__item']}>
              <FaFacebookF />
            </a>
            <a className={styles['socials-payment__item']}>
              <FaTwitter />
            </a>
            <a className={styles['socials-payment__item']}>
              <FaInstagram />
            </a>
            <a className={styles['socials-payment__item']}>
              <FaVk />
            </a>
            <a className={styles['socials-payment__item']}>
              <FaYoutube />
            </a>
          </div>
          <p className={styles.footer__subtitle}>Payment variants</p>
          <div className={styles.payment}>
            <a className={styles['socials-payment__item']}>
              <FaCcPaypal />
            </a>
            <a className={styles['socials-payment__item']}>
              <FaCcVisa />
            </a>
            <a className={styles['socials-payment__item']}>
              <FaCcMastercard />
            </a>
            <a className={styles['socials-payment__item']}>
              <FaBitcoin />
            </a>
          </div>
        </div>
        <div>
          <p className={styles.footer__subtitle}>Menu</p>
          <NavigationMenu links={menuDefaultLinks} isDarkTheme={true} className={styles.footer__nav} />
        </div>
        <div className={styles.footer__services}>
          <p className={styles.footer__subtitle}>Consumer Services</p>
          <ul className={styles.footer__links}>
            {consumerServicesMenu.map((item) => (
              <li key={item} className={styles['footer__links-item']}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles['footer__sizing-info']}>
          <p className={styles.footer__subtitle}>Sizing Information</p>
          <ul className={styles.footer__links}>
            {sizingInformationMenu.map((item) => (
              <li key={item} className={styles['footer__links-item']}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.underline}></div>
      <div className={styles.footer__copyright}>
        <span>Study project for RSSchool 2025 &copy;</span>
      </div>
    </footer>
  );
}
