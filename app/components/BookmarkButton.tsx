'use client';

import { useRouter } from 'next/navigation';
import useUserStore from '@/zustand/userStore';
import useBookmarkStore from '@/zustand/bookmarkStore';
import styles from './BookmarkButton.module.css';
import { addBookmarks, deleteBookmark } from '@/actions/bookmarks';

interface BookmarkButtonProps {
  meetingId: number;
  width?: number;
  height?: number;
  desktopWidth?: number;
  desktopHeight?: number;
}

export default function BookmarkButton({ meetingId, width = 20, height = 26, desktopWidth, desktopHeight }: BookmarkButtonProps) {
  const router = useRouter();
  const { user } = useUserStore();
  const { isBookmarked, getBookmarkId, removeBookmark, hasHydrated } = useBookmarkStore();
  const accessToken = user?.token?.accessToken || '';
  const fetchBookmarks = useBookmarkStore((state) => state.fetchBookmarks);

  // hydration 완료 후에만 북마크 상태 확인 (hydration 에러 방지)
  const currentBookmark = hasHydrated ? isBookmarked(meetingId) : false;

  // 북마크 추가/제거 처리
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!accessToken) {
      router.push('/login');
      return;
    }

    const formData = new FormData();
    formData.append('accessToken', accessToken);
    formData.append('target_id', String(meetingId));

    if (currentBookmark) {
      // 제거
      const bookmarkId = getBookmarkId(meetingId);
      if (bookmarkId) {
        formData.set('_id', String(bookmarkId));
        const result = await deleteBookmark(null, formData);
        if (!result) {
          removeBookmark(bookmarkId);
        }
      }
    } else {
      // 추가
      const result = await addBookmarks(null, formData); // 북마크 추가 api 실행
      if (result.ok) {
        await fetchBookmarks(accessToken); // 추가할때 북마크를 리패치
      }
    }
  };

  const cssVars = {
    '--bookmark-width': `${width}px`,
    '--bookmark-height': `${height}px`,
    '--bookmark-desktop-width': `${desktopWidth ?? width}px`,
    '--bookmark-desktop-height': `${desktopHeight ?? height}px`,
  } as React.CSSProperties;

  return (
    <button type="button" className={styles['bookmark-btn']} onClick={handleClick} aria-label={currentBookmark ? '북마크 해제' : '북마크 추가'}>
      <svg style={cssVars} viewBox="0 0 23 29" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${styles['bookmark-icon']} ${currentBookmark ? styles['active'] : ''}`}>
        <path d="M3.83301 1H19.167C20.782 1.00016 21.9998 2.22975 22 3.625V27.1904C21.9998 27.4458 21.8496 27.7226 21.5488 27.8848C21.2571 28.0419 20.8859 28.0392 20.5879 27.8721H20.5889L11.9932 22.9951L11.5 22.7148L11.0068 22.9951L2.40527 27.8721C2.11263 28.0358 1.73893 28.04 1.43848 27.8809C1.15358 27.73 1.00016 27.4565 1 27.1904V3.625C1.00019 2.22975 2.21796 1.00017 3.83301 1Z" />
      </svg>
    </button>
  );
}
