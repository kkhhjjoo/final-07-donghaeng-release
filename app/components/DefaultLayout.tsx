import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import styles from './DefaultLayout.module.css';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles[`default-layout`]}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
