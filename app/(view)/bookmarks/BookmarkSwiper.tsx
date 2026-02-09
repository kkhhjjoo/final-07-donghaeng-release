'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import style from './Bookmarks.module.css';
import BookmarkMeetingCard from './BookmarkMeetingCard';
import { Bookmarks } from '@/types/bookmarks';

interface BookmarkSwiperProps {
  bookmarks: Bookmarks[];
}

export default function BookmarkSwiper({ bookmarks }: BookmarkSwiperProps) {
  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={40}
      slidesPerView={'auto'}
      centeredSlides={true}
      pagination={{ clickable: true }}
      className={style.swiper}
      breakpoints={{
        0: { enabled: false, centeredSlides: false },
        1024: { enabled: true, centeredSlides: true },
      }}
    >
      {bookmarks.map((bookmark) => (
        <SwiperSlide key={bookmark._id}>
          <BookmarkMeetingCard meeting={bookmark.product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
