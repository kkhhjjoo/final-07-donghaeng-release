'use client';

import 'swiper/css';
import 'swiper/css/free-mode';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import style from './MeetingList.module.css';
import { useRouter } from 'next/navigation';

export default function Category() {
  const categories = ['전체', '운동', '요리 / 제조', '문화 / 공연 / 축제', '게임 / 오락', '인문학 / 책 / 글', '아웃도어 / 여행', '사교', '음악 / 악기', '업종 / 직무', '외국 / 언어', '공예 / 만들기', '댄스 / 무용', '봉사활동', '사진 / 영상', '자기계발', '스포츠 관람', '반려동물', '자동차 / 바이크'];
  const router = useRouter();
  const handleCategory = (category: string) => {
    switch (category) {
      case '전체':
        router.push('/meetings?category=all');
        break;
      case '운동':
        router.push('/meetings?category=health');
        break;
      case '요리 / 제조':
        router.push('/meetings?category=cook');
        break;
      case '문화 / 공연 / 축제':
        router.push('/meetings?category=festival');
        break;
      case '게임 / 오락':
        router.push('/meetings?category=arcade');
        break;
      case '인문학 / 책 / 글':
        router.push('/meetings?category=book');
        break;
      case '아웃도어 / 여행':
        router.push('/meetings?category=outdoor');
        break;
      case '사교':
        router.push('/meetings?category=social');
        break;
      case '음악 / 악기':
        router.push('meetings?category=music');
        break;
      case '업종 / 직무':
        router.push('meetings?category=job');
        break;
      case '외국 / 언어':
        router.push('meetings?category=language');
        break;
      case '공예 / 만들기':
        router.push('meetings?category=make');
        break;
      case '댄스 / 무용':
        router.push('meetings?category=dance');
        break;
      case '봉사활동':
        router.push('meetings?category=volunteer');
        break;
      case '사진 / 영상':
        router.push('meetings?category=picture');
        break;
      case '자기계발':
        router.push('meetings?category=self');
        break;
      case '스포츠 관람':
        router.push('meetings?category=sports');
        break;
      case '반려동물':
        router.push('meetings?category=pet');
        break;
      case '자동차 / 바이크':
        router.push('meetings?category=bike');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <aside className={style.sidebar}>
        <div className={style.categoryListDesktop}>
          <ul className={style.categoryList}>
            {categories.map((category, index) => (
              <li key={index} onClick={() => handleCategory(category)} className={`${style.categoryItem}`}>
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
