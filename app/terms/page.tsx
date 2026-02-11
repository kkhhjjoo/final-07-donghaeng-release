import styles from './Terms.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관',
  description: 'Moa 서비스 이용약관을 확인하세요.',
};

export default function Terms() {
  return <h1 className={styles.terms}>Terms</h1>;
}
