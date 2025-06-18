import { JSX, useEffect, useState } from 'react';
import Button from '@components/button/Button.tsx';

interface ICartButtonProps {
  size: 'large' | 'medium' | 'small' | 'x-small';
  productInCart: string | null;
  disabled: boolean;
  addFunction: () => void;
  removeFunction: () => void;
}

export default function CartButton({
  size,
  productInCart,
  disabled,
  addFunction,
  removeFunction,
}: ICartButtonProps): JSX.Element {
  const [message, setMessage] = useState('Add to cart');
  useEffect(() => {
    if (!productInCart || disabled) {
      setMessage('Add to cart');
    } else {
      setMessage('Remove from cart');
    }
  }, [productInCart, disabled]);
  return (
    <Button
      size={size}
      disabled={disabled}
      onClick={() => {
        if (!productInCart) {
          addFunction();
        } else {
          removeFunction();
        }
      }}
    >
      {message}
    </Button>
  );
}
