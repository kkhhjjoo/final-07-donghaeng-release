import styles from './BlankLayout.module.css';

export default function BlankLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles[`blank-layout`]}>{children}</div>;
}
