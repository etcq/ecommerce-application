import { useState, useEffect } from 'react';
import { useProductListStore } from '@/core/stores/product-list-store.ts';

export default function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const { setPage } = useProductListStore();
  useEffect(() => {
    const handler = setTimeout(() => {
      if (value?.length >= 3 || value === '') {
        setDebouncedValue(value);
        setPage(1);
      }
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay, setPage]);
  return debouncedValue;
}
