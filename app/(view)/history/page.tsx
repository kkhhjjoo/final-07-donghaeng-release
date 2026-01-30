'use client';

import { useState, useEffect } from 'react';
import style from './History.module.css';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

//Swiper 스타일 import
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import DefaultLayout from '@/app/components/DefaultLayout';
import { Meetings } from '@/types/meetings';

type MeetingWithJoined = Meetings & { joined: boolean; people: number };

//카드 컴포넌트 분리
function MeetingCard({ meeting }: { meeting: MeetingWithJoined }) {
  return (
    <Link href={`/meeting/${meeting._id}`} className={style.card}>
      <div className={style.cardContent}>
        <div className={style.imageWrapper}>
          <div className={style.characterImage}></div>
        </div>
        <div className={style.infoWrapper}>
          <h3 className={style.cardTitle}>{meeting.content}</h3>
          <ul className={style.infoList}>
            <li className={style.infoItem}>
              <p>
                * {meeting.extra.region}. {meeting.extra.category}
              </p>
            </li>
            <li className={style.infoItem}>
              <p>
                * {meeting.extra.age}, {meeting.extra.gender}
              </p>
            </li>
            <li className={style.infoItem}>
              <p>* {meeting.people}</p>
            </li>
            <li className={style.infoItem}>
              <p>* {meeting.extra.date}</p>
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
}

export default function HistoryPage() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [filter, setFilter] = useState<'before' | 'after'>('before');
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [meetings, setMeetings] = useState<MeetingWithJoined[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 필터링: 참여 전(신청한 모임 + 아직 참여 안한 모임), 참여 후(참여 완료된 모임)
  const filteredMeetings = meetings.filter((meeting) => (filter === 'before' ? !meeting.joined : meeting.joined));

  // 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
  }, []);

  // 모임 목록 조회
  useEffect(() => {
    const fetchMeetings = async () => {
      setIsLoading(true);
      try {
        if (isLoggedIn) {
          // 로그인 상태: GET /carts/
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carts/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`,
            },
          });

          if (!response.ok) throw new Error('모임 목록 조회 실패');

          const data = await response.json();

          // API 응답 데이터를 joined 상태에 따라 처리
          // joined: false - 신청만 한 상태 (참여 전에 표시)
          // joined: true - 참여 완료된 상태 (참여 후에 표시)
          setMeetings(data);
        } else {
          // 비로그인 상태: POST /carts/local
          const localCartData = JSON.parse(localStorage.getItem('localCart') || '[]');

          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carts/local`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items: localCartData }),
          });

          if (!response.ok) throw new Error('로컬 모임 목록 조회 실패');

          const data = await response.json();
          // 비로그인 상태에서는 모두 신청 상태(joined: false)로 처리
          setMeetings(data.map((item: Meetings) => ({ ...item, joined: false })));
        }
      } catch (error) {
        console.error('모임 목록 조회 에러:', error);
        setMeetings([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetings();
  }, [isLoggedIn]);

  // 스케일 적용 함수
  const applyScaleEffect = (swiper: SwiperType) => {
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
  }, [filter, swiperInstance, filteredMeetings.length]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (isLoading) {
    return (
      <DefaultLayout>
        <div className={style.loading}>로딩 중...</div>
      </DefaultLayout>
    );
  }

  return (
    <>
      {isDesktop ? (
        <DefaultLayout>
          <div className={style.container}>
            <h2 className={style.title}>모임 조회</h2>
            <div className={style.btnGroup}>
              <button className={`${style.beforeBtn} ${filter === 'before' ? style.active : ''}`} onClick={() => setFilter('before')}>
                참여 전
              </button>
              <button className={`${style.afterBtn} ${filter === 'after' ? style.active : ''}`} onClick={() => setFilter('after')}>
                참여 후
              </button>
            </div>
            {filteredMeetings.length === 0 ? (
              <div className={style.contentWrapper}>리스트가 없습니다</div>
            ) : (
              <Swiper
                className={style.swiper}
                modules={[Pagination]}
                slidesPerView={1.2}
                spaceBetween={20}
                centeredSlides={true}
                pagination={{ clickable: true }}
                onSwiper={(swiper) => {
                  setSwiperInstance(swiper);
                }}
                onSlideChange={(swiper) => {
                  applyScaleEffect(swiper);
                }}
                onInit={(swiper) => {
                  applyScaleEffect(swiper);
                }}
              >
                {filteredMeetings.map((meeting) => (
                  <SwiperSlide key={meeting._id} className={style.swiperSlide}>
                    <MeetingCard meeting={meeting} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </DefaultLayout>
      ) : (
        <DefaultLayout>
          <div className={style.container}>
            <h2 className={style.title}>모임 조회</h2>
            <div className={style.btnGroup}>
              <button className={`${style.beforeBtn} ${filter === 'before' ? style.active : ''}`} onClick={() => setFilter('before')}>
                참여 전
              </button>
              <button className={`${style.afterBtn} ${filter === 'after' ? style.active : ''}`} onClick={() => setFilter('after')}>
                참여 후
              </button>
            </div>
            {filteredMeetings.length === 0 ? (
              <div className={style.mobileContentWrapper}>
                <p className={style.none}>리스트가 없습니다</p>
              </div>
            ) : (
              <div className={style.mobileCardList}>
                {filteredMeetings.map((meeting) => (
                  <MeetingCard key={meeting._id} meeting={meeting} />
                ))}
              </div>
            )}
          </div>
        </DefaultLayout>
      )}
    </>
  );
}
