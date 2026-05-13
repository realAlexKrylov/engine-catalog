import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { enginesApi } from '../../api/engines';
import { manufacturersApi } from '../../api/manufacturers';
import { categoriesApi } from '../../api/categories';
import { reviewsApi } from '../../api/reviews';
import { useAuth } from '../../context/AuthContext';
import { Category, Engine, Manufacturer, Review } from '../../types';
import styles from './EngineDetail.module.css';

export default function EngineDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  const [engine, setEngine] = useState<Engine | null>(null);
  const [manufacturer, setManufacturer] = useState<Manufacturer | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    enginesApi.getById(id).then((eng) => {
      setEngine(eng);
      manufacturersApi.getById(eng.manufacturerId).then(setManufacturer);
      categoriesApi.getById(eng.categoryId).then(setCategory);
    });
    reviewsApi.getAll(id).then(setReviews);
  }, [id]);

  const handleReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      const review = await reviewsApi.create({ engineId: id!, rating, comment });
      setReviews((prev) => [...prev, review]);
      setComment('');
      setRating(5);
    } catch {
      setError('Ошибка при отправке отзыва');
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    await reviewsApi.remove(reviewId);
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
  };

  const handleDeleteEngine = async () => {
    if (!confirm('Удалить этот двигатель?')) return;
    await enginesApi.remove(id!);
    navigate('/engines');
  };

  if (!engine) return <p className={styles.loading}>Загрузка...</p>;

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '—';

  return (
    <div className={styles.wrapper}>
      <button onClick={() => navigate(-1)} className={styles.back}>
        ← Назад
      </button>

      <div className={styles.header}>
        <div>
          <h1 className={styles.name}>{engine.name}</h1>
          <div className={styles.meta}>
            {manufacturer && <span>{manufacturer.name}</span>}
            {category && <span className={styles.badge}>{category.name}</span>}
          </div>
        </div>
        {isAdmin && (
          <div className={styles.adminActions}>
            <button onClick={() => navigate(`/admin/engines/${id}/edit`)} className={styles.editBtn}>
              Редактировать
            </button>
            <button onClick={handleDeleteEngine} className={styles.deleteBtn}>
              Удалить
            </button>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.specsBlock}>
          <h2>Технические характеристики</h2>
          <table className={styles.specsTable}>
            <tbody>
              <tr><td>Мощность</td><td>{engine.power} л.с.</td></tr>
              <tr><td>Крутящий момент</td><td>{engine.torque} Нм</td></tr>
              <tr><td>Объём</td><td>{(engine.displacement / 1000).toFixed(1)} л ({engine.displacement} куб.см)</td></tr>
              <tr><td>Количество цилиндров</td><td>{engine.cylinders}</td></tr>
              <tr><td>Тип топлива</td><td>{engine.fuelType}</td></tr>
              <tr><td>Год выпуска</td><td>{engine.year}</td></tr>
              <tr><td>Стоимость</td><td>{engine.price.toLocaleString('ru-RU')} ₽</td></tr>
            </tbody>
          </table>
          <p className={styles.description}>{engine.description}</p>
        </div>

        <div className={styles.reviewsBlock}>
          <h2>Отзывы {reviews.length > 0 && <span className={styles.avgRating}>★ {avgRating}</span>}</h2>

          {reviews.length === 0 && <p className={styles.noReviews}>Отзывов пока нет</p>}

          {reviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <span className={styles.stars}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                <span className={styles.reviewDate}>
                  {new Date(review.createdAt).toLocaleDateString('ru-RU')}
                </span>
                {(isAdmin || user?.id === review.userId) && (
                  <button onClick={() => handleDeleteReview(review.id)} className={styles.deleteReview}>
                    ✕
                  </button>
                )}
              </div>
              <p className={styles.reviewComment}>{review.comment}</p>
            </div>
          ))}

          {user && (
            <form onSubmit={handleReview} className={styles.reviewForm}>
              <h3>Оставить отзыв</h3>
              <div className={styles.ratingSelect}>
                <label>Оценка:</label>
                <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                  {[5, 4, 3, 2, 1].map((v) => (
                    <option key={v} value={v}>{v} ★</option>
                  ))}
                </select>
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Ваш отзыв..."
                className={styles.textarea}
                rows={4}
              />
              {error && <p className={styles.error}>{error}</p>}
              <button type="submit" className={styles.submitBtn}>Отправить</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
