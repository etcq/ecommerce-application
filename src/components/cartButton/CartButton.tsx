import { JSX, useEffect, useState } from 'react';
import Button from '@components/button/Button.tsx';

interface ICartButtonProps {
  size: 'large' | 'medium' | 'small' | 'x-small';
  productInCart: string;
  addFunction: () => void;
  removeFunction: () => void;
}

export default function CartButton({
  size,
  productInCart,
  addFunction,
  removeFunction,
}: ICartButtonProps): JSX.Element {
  const [message, setMessage] = useState('Add to cart');
  useEffect(() => {
    console.log(productInCart);
    if (!productInCart) {
      setMessage('Remove from cart');
    } else {
      setMessage('Add to cart');
    }
  }, [productInCart]);
  return (
    <Button
      size={size}
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
