'use client';

import Image from 'next/image';
import styles from './Main.module.css';
import DefaultLayout from '@/app/components/DefaultLayout';
import Link from 'next/link';
import BookmarkButton from '@/app/components/BookmarkButton';
import AiRecommendModal from './components/AiRecommendModal';
import { useState, useEffect, useMemo } from 'react';
import { getMeetings } from '@/lib/meetings';
import { Meetings } from '@/types/meetings';
import KakaoMap from '@/app/map/KakaoMap';

// 배열에서 랜덤하게 n개 선택
function getRandomItems<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

export default function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [meetings, setMeetings] = useState<Meetings[]>([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      const res = await getMeetings();
      if (res.ok === 1) {
        setMeetings(res.item);
      }
    };
    fetchMeetings();
  }, []);

  // 카테고리별 랜덤 4개 모임
  const categoryMeetings = useMemo(() => {
    return {
      운동: getRandomItems(
        meetings.filter((m) => m.extra.category === '운동'),
        4
      ),
      '요리 / 제조': getRandomItems(
        meetings.filter((m) => m.extra.category === '요리 / 제조'),
        4
      ),
      '문화 / 공연 / 축제': getRandomItems(
        meetings.filter((m) => m.extra.category === '문화 / 공연 / 축제'),
        4
      ),
      '게임 / 오락': getRandomItems(
        meetings.filter((m) => m.extra.category === '게임 / 오락'),
        4
      ),
    };
  }, [meetings]);

  return (
    <DefaultLayout>
      <main className={styles[`main-wrapper`]}>
        <div className={styles[`banner`]} role="img" aria-label="배너 이미지" />
        {/* 검색바 및 ai추천 버튼 */}
        <section className={styles[`search-ai-wrapper`]}>
          <form className={styles[`search-bar-wrapper`]}>
            <div className={styles[`input-image-wrapper`]}>
              <label htmlFor="search-bar" className="sr-only">
                모임 검색
              </label>
              <input className={styles[`search-bar`]} type="search" id="search-bar" placeholder="관심 있는 모임을 검색으로 찾아보세요!" />
              <button type="submit">
                <Image className={styles[`search-image`]} src="/icon/search.svg" alt="검색아이콘" width={27} height={27} />
              </button>
            </div>
          </form>
          <button type="button" className={styles[`ai-recommend`]} onClick={() => setIsModalOpen(true)}>
            <span>AI</span>
            <span>추천</span>
          </button>
        </section>
        {/* 지도 미리보기 */}
        <section className={styles[`map-preview-wrapper`]}>
          <div className={styles[`map-link`]}>
            <Link className={styles[`map-link-text`]} href="/map">
              모임 지도
              <Image src="/icon/right.svg" width={12} height={20} alt="오른쪽화살표" style={{ height: 'auto' }} />
            </Link>
          </div>
          <div className={styles[`map-view`]}>
            <KakaoMap lat={37.4986} lng={126.9917} meetings={meetings} />
          </div>
        </section>
        {/* 카테고리 별 리스트 */}
        <section className={styles[`section-meetings-wrapper`]}>
          <div className={styles[`section-link`]}>
            <Link href="/meetings" className={styles[`section-link-text`]}>
              운동
              <Image src="/icon/right.svg" width={12} height={20} alt="오른쪽화살표" style={{ height: 'auto' }} />
            </Link>
          </div>
          <div className={styles[`section-list`]}>
            {categoryMeetings['운동'].map((meeting) => (
              <div key={meeting._id} className={styles[`meetings-wrapper`]}>
                <Link href={`/meetings/${meeting._id}`} className={styles[`meetings-image-box`]}>
                  <Image src={meeting.mainImages[0].path} alt={meeting.name} fill sizes="(max-width: 1024px) 50vw, 25vw" />
                  <BookmarkButton meetingId={meeting._id} desktopWidth={23} desktopHeight={29} />
                </Link>
                <Link href={`/meetings/${meeting._id}`} className={styles[`meetings-title`]}>
                  {meeting.name}
                </Link>
              </div>
            ))}
          </div>
        </section>
        <section className={styles[`section-meetings-wrapper`]}>
          <div className={styles[`section-link`]}>
            <Link href="/meetings" className={styles[`section-link-text`]}>
              요리 / 제조
              <Image src="/icon/right.svg" width={12} height={20} alt="오른쪽화살표" />
            </Link>
          </div>
          <div className={styles[`section-list`]}>
            {categoryMeetings['요리 / 제조'].map((meeting) => (
              <div key={meeting._id} className={styles[`meetings-wrapper`]}>
                <Link href={`/meetings/${meeting._id}`} className={styles[`meetings-image-box`]}>
                  <Image src={meeting.mainImages[0].path} alt={meeting.name} fill sizes="(max-width: 1024px) 50vw, 25vw" />
                  <BookmarkButton meetingId={meeting._id} desktopWidth={23} desktopHeight={29} />
                </Link>
                <Link href={`/meetings/${meeting._id}`} className={styles[`meetings-title`]}>
                  {meeting.name}
                </Link>
              </div>
            ))}
          </div>
        </section>
        <section className={styles[`section-meetings-wrapper`]}>
          <div className={styles[`section-link`]}>
            <Link href="/meetings" className={styles[`section-link-text`]}>
              문화 / 공연 / 축제
              <Image src="/icon/right.svg" width={12} height={20} alt="오른쪽화살표" />
            </Link>
          </div>
          <div className={styles[`section-list`]}>
            {categoryMeetings['문화 / 공연 / 축제'].map((meeting) => (
              <div key={meeting._id} className={styles[`meetings-wrapper`]}>
                <Link href={`/meetings/${meeting._id}`} className={styles[`meetings-image-box`]}>
                  <Image src={meeting.mainImages[0].path} alt={meeting.name} fill />
                  <BookmarkButton meetingId={meeting._id} desktopWidth={23} desktopHeight={29} />
                </Link>
                <Link href={`/meetings/${meeting._id}`} className={styles[`meetings-title`]}>
                  {meeting.name}
                </Link>
              </div>
            ))}
          </div>
        </section>
        <section className={styles[`section-meetings-wrapper`]}>
          <div className={styles[`section-link`]}>
            <Link href="/meetings" className={styles[`section-link-text`]}>
              게임 / 오락
              <Image src="/icon/right.svg" width={12} height={20} alt="오른쪽화살표" />
            </Link>
          </div>
          <div className={styles[`section-list`]}>
            {categoryMeetings['게임 / 오락'].map((meeting) => (
              <div key={meeting._id} className={styles[`meetings-wrapper`]}>
                <Link href={`/meetings/${meeting._id}`} className={styles[`meetings-image-box`]}>
                  <Image src={meeting.mainImages[0].path} alt={meeting.name} fill sizes="(max-width: 1024px) 50vw, 25vw" />
                  <BookmarkButton meetingId={meeting._id} desktopWidth={23} desktopHeight={29} />
                </Link>
                <Link href={`/meetings/${meeting._id}`} className={styles[`meetings-title`]}>
                  {meeting.name}
                </Link>
              </div>
            ))}
          </div>
        </section>
        <AiRecommendModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </main>
    </DefaultLayout>
  );
}
