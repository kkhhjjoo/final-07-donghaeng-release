'use client';

import useChat from '@/hooks/useChat';
import Link from 'next/link';
import styles from './ChatBadge.module.css';

export default function ChatNotification() {
  const { totalUnreadCount } = useChat(); // 전역 채팅 소켓 연결 유지 및 카운트

  return (
    <Link href="/chat" className={styles.link}>
      <svg className={styles.icon} fill="none" viewBox="0 0 24 24">
        <path stroke="#c5baff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      {totalUnreadCount > 0 && <span className={styles.badge}>{totalUnreadCount > 99 ? '99+' : totalUnreadCount}</span>}
      <span className={styles.srOnly}>채팅함 이동 (알림 {totalUnreadCount}개)</span>
    </Link>
  );
}
