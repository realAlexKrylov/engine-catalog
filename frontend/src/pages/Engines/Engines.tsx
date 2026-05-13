import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { categoriesApi } from '../../api/categories';
import { enginesApi } from '../../api/engines';
import { manufacturersApi } from '../../api/manufacturers';
import EngineCard from '../../components/EngineCard/EngineCard';
import { Category, Engine, Manufacturer } from '../../types';
import styles from './Engines.module.css';

export default function Engines() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [engines, setEngines] = useState<Engine[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');

  const categoryId = searchParams.get('categoryId') ?? '';
  const manufacturerId = searchParams.get('manufacturerId') ?? '';

  useEffect(() => {
    Promise.all([
      enginesApi.getAll({ categoryId: categoryId || undefined, manufacturerId: manufacturerId || undefined }),
      manufacturersApi.getAll(),
      categoriesApi.getAll(),
    ]).then(([eng, mfr, cat]) => {
      setEngines(eng);
      setManufacturers(mfr);
      setCategories(cat);
    });
  }, [categoryId, manufacturerId]);

  const filtered = engines.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase()),
  );

  const setFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
  };

  return (
    <div>
      <h1 className={styles.title}>Каталог двигателей</h1>
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Поиск по названию..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={categoryId}
          onChange={(e) => setFilter('categoryId', e.target.value)}
          className={styles.select}
        >
          <option value="">Все категории</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          value={manufacturerId}
          onChange={(e) => setFilter('manufacturerId', e.target.value)}
          className={styles.select}
        >
          <option value="">Все производители</option>
          {manufacturers.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>
      <p className={styles.count}>Найдено: {filtered.length}</p>
      <div className={styles.grid}>
        {filtered.map((engine) => (
          <EngineCard
            key={engine.id}
            engine={engine}
            manufacturer={manufacturers.find((m) => m.id === engine.manufacturerId)}
            category={categories.find((c) => c.id === engine.categoryId)}
          />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className={styles.empty}>Двигатели не найдены</p>
      )}
    </div>
  );
}
