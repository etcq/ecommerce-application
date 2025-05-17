import { createRoot } from 'react-dom/client';
import { describe, it } from 'vitest';
import { act } from 'react';
import App from '@/App';

describe('App main test', () => {
  it('App must be rendered without crashing', () => {
    const root = document.createElement('div');
    act(() => {
      createRoot(root).render(<App />);
    });
  });
});
