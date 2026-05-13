import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Layout.module.css';

export default function Layout() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.logo}>
            Каталог двигателей
          </Link>
          <nav className={styles.nav}>
            <Link to="/engines">Двигатели</Link>
            <Link to="/manufacturers">Производители</Link>
            {isAdmin && <Link to="/admin">Панель управления</Link>}
          </nav>
          <div className={styles.authBlock}>
            {user ? (
              <>
                <span className={styles.userName}>{user.name}</span>
                <button onClick={handleLogout} className={styles.btnOutline}>
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={styles.btnOutline}>
                  Войти
                </Link>
                <Link to="/register" className={styles.btnPrimary}>
                  Регистрация
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>© 2026 Каталог двигателей. Крылов А.Ф.</p>
      </footer>
    </div>
  );
}
