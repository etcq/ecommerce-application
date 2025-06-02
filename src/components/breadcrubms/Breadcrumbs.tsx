import styles from './breadcrumbs.module.scss';
import React from 'react';
import { useBreadcrumbStore } from '@/core/stores/use-breadcrumbs.ts';
import { useCategoryNavigationStore } from '@/core/stores/use-category-navigation.ts';
import { IBreadcrumbItem } from '@/interfaces/interfaces.ts';

interface IBreadcrumbsProps {
  onBreadcrumbClick: (categoryId: string) => void;
}

export const Breadcrumbs: React.FC<IBreadcrumbsProps> = ({ onBreadcrumbClick }) => {
  const { breadcrumb, resetBreadcrumb } = useBreadcrumbStore();
  const { setReset } = useCategoryNavigationStore();

  return (
    <div className={styles.wrapper}>
      <span
        className={styles.path}
        onClick={(): void => {
          resetBreadcrumb();
          setReset();
        }}
      >
        Catalog /{' '}
      </span>
      {breadcrumb.length > 0 && (
        <>
          {breadcrumb.map((item: IBreadcrumbItem, index: number) => {
            const isLast: boolean = index === breadcrumb.length - 1;
            return (
              <span key={item.id}>
                {isLast ? (
                  <span className={styles.path}>{item.name}</span>
                ) : (
                  <span
                    onClick={(): void => onBreadcrumbClick(item.id)}
                    className={styles.path}
                    style={{ cursor: 'pointer' }}
                  >
                    {item.name}
                  </span>
                )}
                {index < breadcrumb.length - 1 && ' / '}
              </span>
            );
          })}
        </>
      )}
    </div>
  );
};
