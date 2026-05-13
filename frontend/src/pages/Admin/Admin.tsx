import { useEffect, useState } from 'react';
import { categoriesApi } from '../../api/categories';
import { enginesApi } from '../../api/engines';
import { manufacturersApi } from '../../api/manufacturers';
import { Category, Engine, Manufacturer } from '../../types';
import EngineForm from './EngineForm';
import ManufacturerForm from './ManufacturerForm';
import CategoryForm from './CategoryForm';
import styles from './Admin.module.css';

type Tab = 'engines' | 'manufacturers' | 'categories';

export default function Admin() {
  const [tab, setTab] = useState<Tab>('engines');
  const [engines, setEngines] = useState<Engine[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingEngine, setEditingEngine] = useState<Engine | null>(null);
  const [editingManufacturer, setEditingManufacturer] = useState<Manufacturer | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showEngineForm, setShowEngineForm] = useState(false);
  const [showManufacturerForm, setShowManufacturerForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const load = () => {
    enginesApi.getAll().then(setEngines);
    manufacturersApi.getAll().then(setManufacturers);
    categoriesApi.getAll().then(setCategories);
  };

  useEffect(() => { load(); }, []);

  const handleDeleteEngine = async (id: string) => {
    if (!confirm('Удалить двигатель?')) return;
    await enginesApi.remove(id);
    setEngines((prev) => prev.filter((e) => e.id !== id));
  };

  const handleDeleteManufacturer = async (id: string) => {
    if (!confirm('Удалить производителя?')) return;
    await manufacturersApi.remove(id);
    setManufacturers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Удалить категорию?')) return;
    await categoriesApi.remove(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div>
      <h1 className={styles.title}>Панель управления</h1>
      <div className={styles.tabs}>
        {(['engines', 'manufacturers', 'categories'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`${styles.tab} ${tab === t ? styles.activeTab : ''}`}
          >
            {t === 'engines' ? 'Двигатели' : t === 'manufacturers' ? 'Производители' : 'Категории'}
          </button>
        ))}
      </div>

      {tab === 'engines' && (
        <div>
          <button onClick={() => { setEditingEngine(null); setShowEngineForm(true); }} className={styles.addBtn}>
            + Добавить двигатель
          </button>
          {showEngineForm && (
            <EngineForm
              initial={editingEngine}
              manufacturers={manufacturers}
              categories={categories}
              onSave={() => { setShowEngineForm(false); load(); }}
              onCancel={() => setShowEngineForm(false)}
            />
          )}
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Название</th>
                <th>Производитель</th>
                <th>Мощность</th>
                <th>Цена</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {engines.map((e) => (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td>{manufacturers.find((m) => m.id === e.manufacturerId)?.name ?? '—'}</td>
                  <td>{e.power} л.с.</td>
                  <td>{e.price.toLocaleString('ru-RU')} ₽</td>
                  <td>
                    <button onClick={() => { setEditingEngine(e); setShowEngineForm(true); }} className={styles.editBtn}>
                      Изм.
                    </button>
                    <button onClick={() => handleDeleteEngine(e.id)} className={styles.deleteBtn}>
                      Уд.
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'manufacturers' && (
        <div>
          <button onClick={() => { setEditingManufacturer(null); setShowManufacturerForm(true); }} className={styles.addBtn}>
            + Добавить производителя
          </button>
          {showManufacturerForm && (
            <ManufacturerForm
              initial={editingManufacturer}
              onSave={() => { setShowManufacturerForm(false); load(); }}
              onCancel={() => setShowManufacturerForm(false)}
            />
          )}
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Название</th>
                <th>Страна</th>
                <th>Год основания</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {manufacturers.map((m) => (
                <tr key={m.id}>
                  <td>{m.name}</td>
                  <td>{m.country}</td>
                  <td>{m.foundedYear}</td>
                  <td>
                    <button onClick={() => { setEditingManufacturer(m); setShowManufacturerForm(true); }} className={styles.editBtn}>
                      Изм.
                    </button>
                    <button onClick={() => handleDeleteManufacturer(m.id)} className={styles.deleteBtn}>
                      Уд.
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'categories' && (
        <div>
          <button onClick={() => { setEditingCategory(null); setShowCategoryForm(true); }} className={styles.addBtn}>
            + Добавить категорию
          </button>
          {showCategoryForm && (
            <CategoryForm
              initial={editingCategory}
              onSave={() => { setShowCategoryForm(false); load(); }}
              onCancel={() => setShowCategoryForm(false)}
            />
          )}
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Название</th>
                <th>Описание</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.description}</td>
                  <td>
                    <button onClick={() => { setEditingCategory(c); setShowCategoryForm(true); }} className={styles.editBtn}>
                      Изм.
                    </button>
                    <button onClick={() => handleDeleteCategory(c.id)} className={styles.deleteBtn}>
                      Уд.
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
