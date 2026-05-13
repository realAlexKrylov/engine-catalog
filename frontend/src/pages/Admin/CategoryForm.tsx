import { useState } from 'react';
import { categoriesApi } from '../../api/categories';
import { Category } from '../../types';
import styles from './Admin.module.css';

interface Props {
  initial: Category | null;
  onSave: () => void;
  onCancel: () => void;
}

export default function CategoryForm({ initial, onSave, onCancel }: Props) {
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    description: initial?.description ?? '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (initial) {
        await categoriesApi.update(initial.id, form);
      } else {
        await categoriesApi.create(form);
      }
      onSave();
    } catch {
      setError('Ошибка при сохранении');
    }
  };

  return (
    <div className={styles.formOverlay}>
      <div className={styles.formCard}>
        <h2>{initial ? 'Редактировать категорию' : 'Добавить категорию'}</h2>
        <form onSubmit={handleSubmit} className={styles.formGrid}>
          <div className={`${styles.field} ${styles.fullWidth}`}>
            <label>Название</label>
            <input name="name" value={form.name} onChange={handleChange} required />
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
