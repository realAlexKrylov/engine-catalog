import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { manufacturersApi } from '../../api/manufacturers';
import { Manufacturer } from '../../types';
import styles from './Manufacturers.module.css';

export default function Manufacturers() {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);

  useEffect(() => {
    manufacturersApi.getAll().then(setManufacturers);
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Производители</h1>
      <div className={styles.grid}>
        {manufacturers.map((m) => (
          <Link key={m.id} to={`/engines?manufacturerId=${m.id}`} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.name}>{m.name}</span>
              <span className={styles.country}>{m.country}</span>
            </div>
            <div className={styles.founded}>Основана в {m.foundedYear} г.</div>
            <p className={styles.description}>{m.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
