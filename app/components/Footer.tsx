import Link from 'next/link';
import styles from './Footer.module.css';
export default function Footer() {
  return (
    <>
      <footer className={styles[`footer-wrapper`]}>
        <address>Moa_ 채민기, 김지안, 김현주, 유현욱</address>
        <nav className={styles.policy}>
          <Link href="/privacy">개인정보 처리방침</Link>
          <span>|</span>
          <Link href="/terms">이용약관</Link>
        </nav>
        <small>© 2026 동행. All Rights Reserved.</small>
      </footer>
    </>
  );
}
