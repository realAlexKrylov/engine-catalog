import { useState } from 'react';
import { manufacturersApi } from '../../api/manufacturers';
import { Manufacturer } from '../../types';
import styles from './Admin.module.css';

interface Props {
  initial: Manufacturer | null;
  onSave: () => void;
  onCancel: () => void;
}

export default function ManufacturerForm({ initial, onSave, onCancel }: Props) {
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    country: initial?.country ?? '',
    foundedYear: initial?.foundedYear ?? 2000,
    description: initial?.description ?? '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'number' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (initial) {
        await manufacturersApi.update(initial.id, form);
      } else {
        await manufacturersApi.create(form);
      }
      onSave();
    } catch {
      setError('Ошибка при сохранении');
    }
  };

  return (
    <div className={styles.formOverlay}>
      <div className={styles.formCard}>
        <h2>{initial ? 'Редактировать производителя' : 'Добавить производителя'}</h2>
        <form onSubmit={handleSubmit} className={styles.formGrid}>
          <div className={styles.field}>
            <label>Название</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className={styles.field}>
            <label>Страна</label>
            <input name="country" value={form.country} onChange={handleChange} required />
          </div>
          <div className={styles.field}>
            <label>Год основания</label>
            <input type="number" name="foundedYear" value={form.foundedYear} onChange={handleChange} required min={1800} />
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
