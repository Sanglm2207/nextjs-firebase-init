import { useTranslations } from 'next-intl';
import styles from './page.module.css';

export default function Home() {
  const t = useTranslations();
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <h1>{t('welcome')}</h1>
          <p>{t('description')}</p>
        </div>
      </div>
    </main>
  )
}
