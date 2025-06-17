import { JSX } from 'react';
import styles from './labels.module.scss';

const labelsName = ['reebok', 'adidas', 'fila', 'new-balance', 'asics', 'puma', 'vans'];

export default function Labels(): JSX.Element {
  return (
    <section className={styles.labels}>
      <h3>The most popular world brands</h3>
      <div className={styles.labels__wrapper}>
        {labelsName.map((name) => (
          <div
            className={styles.labels__item}
            key={name}
            style={{ background: `url(/labels/${name}.png) no-repeat center/contain` }}
          ></div>
        ))}
      </div>
    </section>
  );
}
