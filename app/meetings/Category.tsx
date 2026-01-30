'use client';

import 'swiper/css';
import 'swiper/css/free-mode';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import style from './MeetingList.module.css';

export default function Category() {
  const categories = ['전체', '운동', '요리 / 제조', '문화 / 공연 / 축제', '게임 / 오락', '인문학 / 책 / 글', '아웃도어 / 여행', '사교', '음악 / 악기', '업종 / 직무', '외국 / 언어', '공예 / 만들기', '댄스 / 무용', '봉사활동', '사진 / 영상', '자기계발', '스포츠 관람', '반려동물', '자동차 / 바이크'];

  return (
    <>
      <aside className={style.sidebar}>
        <div className={style.categoryListDesktop}>
          <ul className={style.categoryList}>
            {categories.map((category, index) => (
              <li key={index} className={`${style.categoryItem}`}>
                {category}
              </li>
            ))}
          </ul>
        </div>
      </aside>
      {/* 모바일: 가로 Swiper 슬라이드 */}
      <div className={style.categoryListMobile}>
        <Swiper
          className={style.categorySwiper}
          modules={[FreeMode]}
          freeMode={{
            enabled: true,
          }}
          spaceBetween={10}
          slidesPerView="auto"
          grabCursor
        >
          {categories.map((category) => (
            <SwiperSlide key={category} className={style.categorySlide}>
              <button type="button" className={`${style.categoryChip}`}>
                {category}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
