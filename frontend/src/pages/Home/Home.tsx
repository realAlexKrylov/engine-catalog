import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { categoriesApi } from '../../api/categories';
import { enginesApi } from '../../api/engines';
import { manufacturersApi } from '../../api/manufacturers';
import EngineCard from '../../components/EngineCard/EngineCard';
import { Category, Engine, Manufacturer } from '../../types';
import styles from './Home.module.css';

export default function Home() {
  const [engines, setEngines] = useState<Engine[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    Promise.all([enginesApi.getAll(), manufacturersApi.getAll(), categoriesApi.getAll()]).then(
      ([eng, mfr, cat]) => {
        setEngines(eng);
        setManufacturers(mfr);
        setCategories(cat);
      },
    );
  }, []);

  const featured = engines.slice(0, 4);

  return (
    <div>
      <section className={styles.hero}>
        <h1>Каталог автомобильных двигателей</h1>
        <p>Полная информация о технических характеристиках, производителях и отзывах</p>
        <Link to="/engines" className={styles.ctaBtn}>
          Смотреть каталог
        </Link>
      </section>

      <section className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{engines.length}</span>
          <span className={styles.statLabel}>Двигателей</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{manufacturers.length}</span>
          <span className={styles.statLabel}>Производителей</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{categories.length}</span>
          <span className={styles.statLabel}>Категорий</span>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Актуальные предложения</h2>
          <Link to="/engines">Все двигатели →</Link>
        </div>
        <div className={styles.grid}>
          {featured.map((engine) => (
            <EngineCard
              key={engine.id}
              engine={engine}
              manufacturer={manufacturers.find((m) => m.id === engine.manufacturerId)}
              category={categories.find((c) => c.id === engine.categoryId)}
            />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Категории</h2>
        <div className={styles.categories}>
          {categories.map((cat) => (
            <Link key={cat.id} to={`/engines?categoryId=${cat.id}`} className={styles.categoryCard}>
              <span className={styles.categoryName}>{cat.name}</span>
              <span className={styles.categoryDesc}>{cat.description}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
