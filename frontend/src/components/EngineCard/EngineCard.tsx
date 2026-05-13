import { Link } from 'react-router-dom';
import { Category, Engine, Manufacturer } from '../../types';
import styles from './EngineCard.module.css';

interface Props {
  engine: Engine;
  manufacturer?: Manufacturer;
  category?: Category;
}

export default function EngineCard({ engine, manufacturer, category }: Props) {
  return (
    <Link to={`/engines/${engine.id}`} className={styles.card}>
      <div className={styles.header}>
        <span className={styles.name}>{engine.name}</span>
        {category && <span className={styles.badge}>{category.name}</span>}
      </div>
      <div className={styles.manufacturer}>{manufacturer?.name ?? '—'}</div>
      <div className={styles.specs}>
        <div className={styles.spec}>
          <span className={styles.label}>Мощность</span>
          <span className={styles.value}>{engine.power} л.с.</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.label}>Момент</span>
          <span className={styles.value}>{engine.torque} Нм</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.label}>Объём</span>
          <span className={styles.value}>{(engine.displacement / 1000).toFixed(1)} л</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.label}>Год</span>
          <span className={styles.value}>{engine.year}</span>
        </div>
      </div>
      <div className={styles.price}>{engine.price.toLocaleString('ru-RU')} ₽</div>
    </Link>
  );
}
