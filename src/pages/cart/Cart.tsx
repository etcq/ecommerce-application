import styles from './cart.module.scss';
import * as React from 'react';
import { useCartStore } from '@/core/stores/use-cart-state.ts';
import { useToastStore } from '@/core/stores/toast.ts';
import { ChangeEvent, useState } from 'react';
import { DISCOUNT_CODE_MESSAGE } from '@/constants/constants.ts';

export default function Cart(): React.JSX.Element {
  const [inputDiscountCode, setInputDiscountCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAddDiscount = async (): Promise<void> => {
    setErrorMessage(null);
    try {
      await useCartStore.getState().applyDiscountCode(inputDiscountCode);
      setInputDiscountCode('');
      useToastStore.getState().setMessage(DISCOUNT_CODE_MESSAGE);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Unexpected error while applying the discount code.');
      }
    }
  };

  const handleInputCode = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputDiscountCode(event.target.value);
    setErrorMessage(null);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>The cart page will be here</h1>
      <button type={'button'} onClick={handleAddDiscount}>
        click
      </button>
      <input
        type={'text'}
        placeholder={'input discount code'}
        value={inputDiscountCode}
        onChange={handleInputCode}
        className={errorMessage ? styles.inputError : ''}
      />
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
}
