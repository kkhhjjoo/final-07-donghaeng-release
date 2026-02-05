import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import styles from './DefaultLayout.module.css';

export default function DefaultLayout({ children, hideFooter = false }: { children: React.ReactNode; hideFooter?: boolean }) {
  return (
    <div className={styles[`default-layout`]}>
      <Header />
      {children}
      <div className={hideFooter ? styles['hide-footer'] : undefined}>
        <Footer />
      </div>
    </div>
  );
}
