import { JSX } from 'react';
import PromoSection from '@/components/mainpage-sections/promo-section/PromoSection';
import PromocodeSection from '@/components/mainpage-sections/promocode-section/PromocodeSection';
import Labels from '@/components/mainpage-sections/labels-section/Labels';
import CategorySection from '@components/mainpage-sections/category-section/CategorySection.tsx';

export default function MainPage(): JSX.Element {
  return (
    <div>
      <PromoSection />
      <PromocodeSection />
      <Labels />
      <CategorySection />
    </div>
  );
}
