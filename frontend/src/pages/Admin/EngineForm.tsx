import { useState } from 'react';
import { enginesApi } from '../../api/engines';
import { Category, Engine, Manufacturer } from '../../types';
import styles from './Admin.module.css';

interface Props {
  initial: Engine | null;
  manufacturers: Manufacturer[];
  categories: Category[];
  onSave: () => void;
  onCancel: () => void;
}

export default function EngineForm({ initial, manufacturers, categories, onSave, onCancel }: Props) {
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    manufacturerId: initial?.manufacturerId ?? '',
    categoryId: initial?.categoryId ?? '',
    displacement: initial?.displacement ?? 0,
    power: initial?.power ?? 0,
    torque: initial?.torque ?? 0,
    cylinders: initial?.cylinders ?? 4,
    fuelType: initial?.fuelType ?? '',
    year: initial?.year ?? 2020,
    description: initial?.description ?? '',
    price: initial?.price ?? 0,
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (initial) {
        await enginesApi.update(initial.id, form);
      } else {
        await enginesApi.create(form);
      }
      onSave();
    } catch {
      setError('Ошибка при сохранении');
    }
  };

  return (
    <div className={styles.formOverlay}>
      <div className={styles.formCard}>
        <h2>{initial ? 'Редактировать двигатель' : 'Добавить двигатель'}</h2>
        <form onSubmit={handleSubmit} className={styles.formGrid}>
          <div className={styles.field}>
            <label>Название</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className={styles.field}>
            <label>Производитель</label>
            <select name="manufacturerId" value={form.manufacturerId} onChange={handleChange} required>
              <option value="">Выберите...</option>
              {manufacturers.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
          <div className={styles.field}>
            <label>Категория</label>
            <select name="categoryId" value={form.categoryId} onChange={handleChange} required>
              <option value="">Выберите...</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className={styles.field}>
            <label>Объём (куб.см)</label>
            <input type="number" name="displacement" value={form.displacement} onChange={handleChange} required min={1} />
          </div>
          <div className={styles.field}>
            <label>Мощность (л.с.)</label>
            <input type="number" name="power" value={form.power} onChange={handleChange} required min={1} />
          </div>
          <div className={styles.field}>
            <label>Момент (Нм)</label>
            <input type="number" name="torque" value={form.torque} onChange={handleChange} required min={1} />
          </div>
          <div className={styles.field}>
            <label>Цилиндры</label>
            <input type="number" name="cylinders" value={form.cylinders} onChange={handleChange} required min={1} />
          </div>
          <div className={styles.field}>
            <label>Тип топлива</label>
            <input name="fuelType" value={form.fuelType} onChange={handleChange} required />
          </div>
          <div className={styles.field}>
            <label>Год</label>
            <input type="number" name="year" value={form.year} onChange={handleChange} required min={1900} />
          </div>
          <div className={styles.field}>
            <label>Цена (₽)</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} required min={0} />
          </div>
          <div className={`${styles.field} ${styles.fullWidth}`}>
            <label>Описание</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={3} />
          </div>
          {error && <p className={`${styles.error} ${styles.fullWidth}`}>{error}</p>}
          <div className={`${styles.formActions} ${styles.fullWidth}`}>
            <button type="button" onClick={onCancel} className={styles.cancelBtn}>Отмена</button>
            <button type="submit" className={styles.saveBtn}>Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  );
}
