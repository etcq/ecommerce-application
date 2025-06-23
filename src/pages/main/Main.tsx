import { JSX } from 'react';
import PromoSection from '@components/mainpage-sections/promo/PromoSection';
import PromocodeSection from '@/components/mainpage-sections/promocode-section/PromocodeSection';
import Labels from '@components/mainpage-sections/labels/Labels';
import CategorySection from '@components/mainpage-sections/category/CategorySection.tsx';

export default function MainPage(): JSX.Element {
  return (
    <div>
      <PromoSection />
      <PromocodeSection />
      <CategorySection />
      <Labels />
    </div>
  );
}
