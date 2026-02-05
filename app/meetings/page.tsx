import style from './MeetingList.module.css';
import Link from 'next/link';
import DefaultLayout from '@/app/components/DefaultLayout';
import { getMeetings } from '@/lib/meetings';
import Category from '@/app/meetings/Category';
import MeetingItem from '@/app/meetings/MeetingItem';

interface PageProps {
  searchParams: Promise<{ keyword?: string; category?: string }>;
}

export default async function Meetinglist({ searchParams }: PageProps) {
  const { keyword, category } = await searchParams;
  const result = await getMeetings(keyword, category); // 키워드에 대한 모임리스트 조회

  return (
    <>
      <DefaultLayout>
        <main className={style.mainLayout}>
          {/* 데스크톱: 사이드바 카테고리 (왼쪽) */}
          <div className={style.topHeader}>
            <div className={style.breadcrumb}>
              <span>홈</span>
              <span className={style.breadcrumbSeparator}>&gt;</span>
              <span className={style.listTitle}>모임 리스트</span>
            </div>
            <div className={style.headerSection}>
              <div className={style.titleSection}>
                <h1 className={style.pageTitle}>{keyword ? `"${keyword}" 검색 결과` : '모임 리스트'}</h1>
              </div>
              <Link href="/meetings/add" className={style.registerButton}>
                <span className={style.desktopText}>모임 등록하기</span>
                <span className={style.mobileText}>모임 등록</span>
              </Link>
            </div>
          </div>
          <div className={style.row}>
            <Category />

            <section className={style.mainContent}>
              <div className={style.meetingBorder}>
                <div className={style.filterBar}></div>
                {result.ok ? (
                  result.item.length > 0 ? (
                    <ul className={style.meetingGrid}>
                      {result.item.map((meeting) => (
                        <MeetingItem key={meeting._id} meeting={meeting} />
                      ))}
                    </ul>
                  ) : (
                    <div className={style['none-data']}>검색 결과가 없습니다.</div>
                  )
                ) : (
                  <p>에러발생</p>
                )}
              </div>
            </section>
          </div>
        </main>
      </DefaultLayout>
    </>
  );
}
