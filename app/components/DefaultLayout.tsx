import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import styles from './DefaultLayout.module.css';

export default function DefaultLayout({ children, hideFooter = false }: { children: React.ReactNode; hideFooter?: boolean }) {
  return (
    <div className={styles[`default-layout`]}>
      <a href="#main-content" className="skip-link">
        본문으로 건너뛰기
      </a>
      <Header />
      <div id="main-content" tabIndex={-1}>
        {children}
      </div>
      <div className={hideFooter ? styles['hide-footer'] : undefined}>
        <Footer />
      </div>
    </div>
  );
}
