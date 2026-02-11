import styles from './Privacy.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: 'Moa의 개인정보처리방침을 확인하세요.',
};

export default function Privacy() {
  return <h1 className={styles.privacy}>Privacy</h1>;
}
