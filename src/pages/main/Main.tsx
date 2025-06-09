import { JSX } from 'react';
import MainPromo from '@components/mainpage-items/main-page-promo/MainPromo.tsx';
import PromocodePreview from '@components/mainpage-items/promocode-preview/PromocodePreview.tsx';

export default function MainPage(): JSX.Element {
  return (
    <div>
      <MainPromo />
      <PromocodePreview />
    </div>
  );
}
