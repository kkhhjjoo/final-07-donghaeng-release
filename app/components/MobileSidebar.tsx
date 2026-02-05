'use client';
import Link from 'next/link';
import styles from './MobileSidebar.module.css';
import useUserStore from '@/zustand/userStore';
import useBookmarkStore from '@/zustand/bookmarkStore';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const isLogin = useUserStore((state) => state.isLogin);
  const user = useUserStore((state) => state.user);
  const resetUser = useUserStore((state) => state.resetUser);
  const resetBookmark = useBookmarkStore((state) => state.resetBookmark);
  const userName = user?.name ?? '사용자';

  const handleLogout = () => {
    resetUser();
    resetBookmark();
  };
  return (
    <>
      {/* 사이드바 열렸을 때 뒷배경을 검고 반투명 하게 할 장치 */}
      <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} onClick={onClose} />
      <section className={`${styles['section-wrapper']} ${isOpen ? styles.open : ''}`}>
        {isLogin ? (
          <div className={styles[`sidebar-wrapper`]}>
            <div className={styles[`menu-username-wrapper`]}>
              <div className={styles[`name-wrapper`]}>
                <div>
                  <span className={styles[`username`]}>{userName}</span>
                  <span> 님</span>
                </div>
                <h3>반가워요!</h3>
              </div>
              <ul>
                <li>
                  <Link href="/mypage">마이페이지</Link>
                </li>
                <li>
                  <Link href="/meetings">모임</Link>
                </li>
                <li>
                  <Link href="/bookmarks">북마크</Link>
                </li>
                <li>
                  <Link href="/history">모임 조회</Link>
                </li>
                <li>
                  <Link href="/map">모임 지도</Link>
                </li>
              </ul>
            </div>
            <button className={styles[`logout-btn`]} onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        ) : (
          <ul className={styles[`menu-wrapper`]}>
            <li>
              <Link href="/login">로그인</Link>
            </li>
            <li>
              <Link href="/signup">회원가입</Link>
            </li>
            <li>
              <Link href="/meetings">리스트</Link>
            </li>
            <li>
              <Link href="/map">모임 지도</Link>
            </li>
          </ul>
        )}
      </section>
    </>
  );
}
