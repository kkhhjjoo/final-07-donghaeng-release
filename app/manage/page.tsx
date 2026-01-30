'use client';

import { useState, useEffect } from 'react';
import style from './ManageAllPage.module.css';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

//Swiper 스타일 import
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import DefaultLayout from '@/app/components/DefaultLayout';
import Image from 'next/image';
import { Meetings } from '@/types/meetings';
import BookmarkButton from '@/app/components/BookmarkButton';
import { getMyAddMeetings } from '@/lib/meetings';
import useUserStore from '@/zustand/userStore';
import { getAgeText, getGenderText } from '@/lib/common';

// 날짜 포맷 변환 함수
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = String(date.getFullYear()).slice(2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const dayName = days[date.getDay()];
  const hours = date.getHours();
  const period = hours >= 12 ? '오후' : '오전';
  const hour12 = hours % 12 || 12;
  return `${year}.${month}.${day}(${dayName}) ${period} ${hour12}:00`;
};

//카드 컴포넌트 분리
function MeetingCard({ meeting }: { meeting: Meetings }) {
  return (
    <article className={style.card}>
      <div className={style.bookmarkIcon} aria-label="북마크">
        <BookmarkButton meetingId={meeting._id} width={23} height={29} />
      </div>
      <div className={style.cardContent}>
        <figure className={style.imageWrapper}>
          <div
            className={style.characterImage}
            role="img"
            aria-label="모임 대표 이미지"
            style={{
              backgroundImage: meeting.mainImages?.[0]?.path ? `url(${meeting.mainImages[0].path})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          <figcaption className={'sr-only'}>모임 대표 이미지</figcaption>
        </figure>
        <div className={style.infoWrapper}>
          <h2 className={style.cardTitle}>{meeting.name}</h2>
          <ul className={style.infoList}>
            <li className={style.infoItem}>
              <span className={style.bullet} aria-hidden="true">
                <Image src="/icon/tag.svg" width={18} height={18} alt="장소 아이콘" />
              </span>
              <p>
                {meeting.extra.region}. {meeting.extra.category}
              </p>
            </li>
            <li className={style.infoItem}>
              <span className={style.bullet} aria-hidden="true">
                <Image src="/icon/info.svg" width={18} height={18} alt="정보 아이콘" />
              </span>
              <p>
                {getAgeText(meeting.extra.age)}, {getGenderText(meeting.extra.gender)}
              </p>
            </li>
            <li className={style.infoItem}>
              <span className={style.bullet} aria-hidden="true">
                <Image src="/icon/people.svg" width={18} height={18} alt="사람들 아이콘" />
              </span>
              <p>인원 {meeting.quantity}명</p>
            </li>
            <li className={style.infoItem}>
              <span className={style.bullet} aria-hidden="true">
                <Image src="/icon/calendar.svg" width={18} height={18} alt="날짜 아이콘" />
              </span>
              <p>{formatDate(meeting.extra.date)}</p>
            </li>
          </ul>
        </div>
      </div>
      <Link href={`/manage/${meeting._id}`} className={style.arrowIcon}>
        <Image src="/icon/arrow.svg" alt="상세보기" width={20} height={20} />
      </Link>
    </article>
  );
}

export default function ManageAllPage() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const [meetings, setMeetings] = useState<Meetings[]>([]);
  const user = useUserStore((state) => state.user);
  const userId = user?._id;
  const accessToken = user?.token?.accessToken;

  // API에서 모임 데이터 가져오기
  useEffect(() => {
    const fetchMyAddMeetings = async () => {
      if (!accessToken) return;
      const response = await getMyAddMeetings(accessToken);

      if (response.ok === 1) {
        setMeetings(response.item);
      }
    };

    fetchMyAddMeetings();
  }, [userId, accessToken]);
  console.log(meetings);

  // 스케일 적용 함수
  const applyScaleEffect = (swiper: SwiperType) => {
    if (!swiper.slides) return;
    swiper.slides.forEach((slide, index) => {
      slide.style.transition = 'all 0.3s ease';
      if (index === swiper.activeIndex) {
        slide.style.transform = 'scale(1)';
        slide.style.opacity = '1';
      } else {
        slide.style.transform = 'scale(0.8)';
        slide.style.opacity = '0.7';
      }
    });
  };

  // 필터 변경 시 Swiper 업데이트
  useEffect(() => {
    if (swiperInstance) {
      setTimeout(() => {
        swiperInstance.slideTo(0, 0);
        applyScaleEffect(swiperInstance);
      }, 50);
    }
  }, [swiperInstance]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <>
      <DefaultLayout>
        <main className={style.container}>
          {isDesktop ? (
            <div className={style.contentWrapper}>
              <h1 className={style.title}>등록 모임</h1>
              <Swiper
                className={style.swiper}
                modules={[Pagination]}
                spaceBetween={20}
                slidesPerView="auto"
                centeredSlides={true}
                pagination={{ clickable: true }}
                onSwiper={setSwiperInstance}
                onSlideChange={(swiper) => {
                  applyScaleEffect(swiper);
                }}
                onInit={(swiper) => {
                  applyScaleEffect(swiper);
                }}
              >
                {meetings.map((meeting) => (
                  <SwiperSlide className={style.swiperSlide} key={meeting._id}>
                    <MeetingCard meeting={meeting} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div className={style.mobileContentWrapper}>
              <h1 className={style.title}>등록 모임</h1>
              <div className={style.mobileCardList}>
                {meetings.map((meeting) => (
                  <MeetingCard key={meeting._id} meeting={meeting} />
                ))}
              </div>
            </div>
          )}
        </main>
      </DefaultLayout>
    </>
  );
}
