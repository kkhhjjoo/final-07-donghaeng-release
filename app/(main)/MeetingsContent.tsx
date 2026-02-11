import Image from 'next/image';
import Link from 'next/link';
import styles from './Main.module.css';
import CategorySection from './CategorySection';
import { getMeetings } from '@/lib/meetings';
import { Meetings } from '@/types/meetings';
import KakaoMap from '@/app/map/KakaoMap';

const CATEGORIES = ['운동', '요리 / 제조', '문화 / 공연 / 축제', '게임 / 오락'] as const;

export default async function MeetingsContent() {
  const res = await getMeetings();
  const meetings: Meetings[] = res.ok === 1 ? res.item : [];

  const categoryMeetings = Object.fromEntries(CATEGORIES.map((category) => [category, meetings.filter((m) => m.extra.category === category).slice(0, 4)])) as Record<(typeof CATEGORIES)[number], Meetings[]>;

  return (
    <>
      {/* 지도 미리보기 */}
      <section className={styles[`map-preview-wrapper`]}>
        <div className={styles[`map-link`]}>
          <Link className={styles[`map-link-text`]} href="/map">
            모임 지도
            <Image src="/icon/right.svg" width={12} height={20} alt="오른쪽화살표" style={{ height: 'auto' }} />
          </Link>
        </div>
        <div className={styles[`map-view`]}>
          <KakaoMap className={styles.map} lat={37.4986} lng={126.9917} meetings={meetings} />
        </div>
      </section>
      {/* 카테고리 별 리스트 */}
      {CATEGORIES.map((category) => (
        <CategorySection key={category} title={category} meetings={categoryMeetings[category]} />
      ))}
    </>
  );
}
