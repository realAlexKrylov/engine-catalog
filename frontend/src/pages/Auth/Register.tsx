import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../api/auth';
import styles from './Auth.module.css';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await authApi.register(name, email, password, age ? Number(age) : undefined);
      navigate('/login');
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Ошибка регистрации');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Регистрация</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Имя</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Иванов Иван"
            />
          </div>
          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@mail.ru"
            />
          </div>
          <div className={styles.field}>
            <label>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Минимум 6 символов"
            />
          </div>
          <div className={styles.field}>
            <label>Возраст (необязательно)</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="25"
              min={1}
              max={120}
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.submitBtn}>Создать аккаунт</button>
        </form>
        <p className={styles.hint}>
          Уже есть аккаунт? <Link to="/login">Войдите</Link>
        </p>
      </div>
    </div>
  );
}
