'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';
import MobileSidebar from '../components/MobileSidebar';
import { useState } from 'react';
import useUserStore from '@/zustand/userStore';

export default function Header() {
  const isLogin = useUserStore((state) => state.isLogin);
  const resetUser = useUserStore((state) => state.resetUser);
  console.log('로그인상태', isLogin);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 햄버거 버튼 클릭 핸들러
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className={styles[`header-wrapper`]}>
        <div className={styles[`logo-wrapper`]}>
          <Link href="/">
            <Image src="/logo/logo.svg" width={40} height={35} alt="로고 이미지" />
          </Link>
        </div>

        {/* 데스크탑 메뉴 */}
        <div className={styles[`meetings-wrapper`]}>
          <ul>
            <li>
              <Link href="/meetings">모임</Link>
            </li>
            <li>
              <Link href="/meetings">지도</Link>
            </li>
            {/* <li>
              <Link href="/bookmarks">북마크</Link>
            </li>
            <li>
              <Link href="/history">모임 조회</Link>
            </li> */}
          </ul>
        </div>

        {/* 데스크탑 유저 정보 */}
        {isLogin ? (
          <div className={styles[`user-info-wrapper`]}>
            <ul>
              <li>
                <button onClick={resetUser}>로그아웃</button>
              </li>
              <li>
                <Link href="/notifications">
                  <Image src="/icon/notification.svg" width={43} height={50} alt="알림 이미지" />
                </Link>
              </li>
              <li>
                <Link href="/mypage">
                  <div className={styles[`image-background`]}>
                    <Image src="/icon/profile.svg" width={41} height={41} alt="사용자 디폴트 이미지" />
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className={styles[`sign-wrapper`]}>
            <ul>
              <li>
                <Link href="/login">로그인</Link>
              </li>
              <li>
                <Link href="/signup">회원가입</Link>
              </li>
            </ul>
          </div>
        )}

        {/* 모바일 메뉴 */}
        <div className={styles[`mobile-menu`]}>
          <Link href="/notifications">
            <Image src="/icon/notification.svg" width={25} height={30} alt="알림 이미지" />
          </Link>
          <button className={styles[`hamburger-btn`]} onClick={toggleSidebar}>
            <Image src="/icon/hamburger.svg" width={30} height={28} alt="메뉴" />
          </button>
        </div>
      </header>
      <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
