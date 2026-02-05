'use client';

import { useState, useEffect } from 'react';
import style from './Bookmarks.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

//Swiper 스타일 import
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import DefaultLayout from '@/app/components/DefaultLayout';
import useUserStore from '@/zustand/userStore';
import { getUserBookmarksList } from '@/lib/bookmarks';
import { Bookmarks } from '@/types/bookmarks';
import { useRouter } from 'next/navigation';
import BookmarkMeetingCard from '@/app/(view)/bookmarks/BookmarkMeetingCard';

export default function BookmarksPage() {
  const { user } = useUserStore();
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState<Bookmarks[]>([]);
  const accessToken = user?.token?.accessToken;
  const [isEmpty, setIsEmpty] = useState(false);
  const hasHydrated = useUserStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;

    if (!accessToken) {
      router.replace('/login');
    }

    const fetchMeetings = async () => {
      const res = await getUserBookmarksList(accessToken || ' ');
      if (!res || res.ok === 0 || !('item' in res)) return;

      if (res.item.length === 0) {
        setBookmarks([]);
        setIsEmpty(true);
      } else {
        setBookmarks(res.item);
        setIsEmpty(false);
      }

      console.log('데이터를 잘 불러와주나요', res, '');
    };

    fetchMeetings();
  }, [hasHydrated, accessToken, router]);

  if (!hasHydrated) return null;

  if (!accessToken) {
    return null;
  }

  return (
    <>
      <DefaultLayout>
        <main className={style.container}>
          {
            <div className={style.contentWrapper}>
              <h1 className={style.title}>북마크</h1>
              {isEmpty ? (
                <div className={style.empty}> 신청한 모임이 없습니다.</div>
              ) : (
                <Swiper
                  modules={[Pagination]}
                  spaceBetween={40}
                  slidesPerView={'auto'}
                  centeredSlides={true}
                  pagination={{
                    clickable: true,
                  }}
                  className={style.swiper}
                  breakpoints={{
                    0: {
                      enabled: false, // 모바일
                      centeredSlides: false,
                    },
                    1024: {
                      enabled: true, // 웹
                      centeredSlides: true,
                    },
                  }}
                >
                  {bookmarks.map((bookmark) => (
                    <SwiperSlide key={bookmark._id}>
                      <BookmarkMeetingCard meeting={bookmark.product} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          }
        </main>
      </DefaultLayout>
    </>
  );
}
