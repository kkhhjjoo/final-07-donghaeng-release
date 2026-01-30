import style from './MeetingList.module.css';
import Link from 'next/link';
import DefaultLayout from '@/app/components/DefaultLayout';

import { getMeetings } from '@/lib/meetings';
import Category from '@/app/meetings/Category';
import MeetingItem from '@/app/meetings/MeetingItem';

export default async function Meetinglist() {
  const result = await getMeetings();
  console.log(result);

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
                <h1 className={style.pageTitle}>{'모임 리스트'}</h1>
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

                <ul className={style.meetingGrid}>{result.ok ? result.item.map((meeting) => <MeetingItem key={meeting._id} meeting={meeting} />) : <p>에러발생</p>}</ul>
              </div>
            </section>
          </div>
        </main>
      </DefaultLayout>
    </>
  );
}
