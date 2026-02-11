import styles from './Faq.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '자주 묻는 질문',
  description: 'Moa 서비스 이용에 대한 자주 묻는 질문과 답변을 확인하세요.',
};

export default function Faq() {
  return <h1 className={styles.faq}>Faq</h1>;
}
