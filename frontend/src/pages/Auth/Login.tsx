import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';
import styles from './Auth.module.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const data = await authApi.login(email, password);
      login(data.access_token, data.user);
      navigate('/');
    } catch {
      setError('Неверный email или пароль');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Вход в систему</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
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
              placeholder="••••••••"
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.submitBtn}>Войти</button>
        </form>
        <p className={styles.hint}>
          Нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
        </p>
        <p className={styles.demo}>
          Демо: admin@engines.ru / password
        </p>
      </div>
    </div>
  );
}
