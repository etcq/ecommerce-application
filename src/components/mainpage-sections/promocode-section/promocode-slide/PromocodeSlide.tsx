import { JSX, useRef, useMemo } from 'react';
import styles from './promocode-slide.module.scss';
import { FaRegCopy } from 'react-icons/fa';
import { IDiscountInfo } from '@/interfaces/interfaces.ts';
import summerSneakerImgPath from '@assets/images/main-page/slider/summer-sneaker.jpg';
import greenSneakersImgPath from '@assets/images/main-page/slider/green-sneakers.webp';
import manySneakerImgPath from '@assets/images/main-page/slider/many-sneaker.webp';
import { useToastStore } from '@/core/stores/toast';
import getSlideSetup from '@/core/utils/get-slide-setup.ts';

export default function PromocodeSlide(props: IDiscountInfo): JSX.Element {
  const { name, description, code } = props;
  const codeInput = useRef<HTMLInputElement | null>(null);
  const { setMessage } = useToastStore();
  const slideSetup = useMemo(() => getSlideSetup([summerSneakerImgPath, greenSneakersImgPath, manySneakerImgPath]), []);

  const copyPromocode = async () => {
    if (!codeInput.current?.value) return;
    try {
      await navigator.clipboard.writeText(codeInput.current.value);
      setMessage('Code copied to clipboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={styles.slide}
      data-align={slideSetup.align}
      style={{ background: `url(${slideSetup.img}) no-repeat center/cover` }}
    >
      <div className={styles['slide-content']}>
        <h2 className={styles['slide-content-header']}>{name}</h2>
        <span className={styles['slide-content-description']}>{description}</span>
        <div className={styles['slide-code']}>
          <FaRegCopy className={styles['slide-code-icon']} onClick={() => void copyPromocode()} />
          <input
            type="text"
            defaultValue={code}
            autoComplete="on"
            min="0"
            max="0"
            step="1"
            className={styles['slide-code-input']}
            ref={codeInput}
          />
        </div>
      </div>
    </div>
  );
}
