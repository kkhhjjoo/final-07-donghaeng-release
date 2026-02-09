'use client';

import { getMeetings } from '@/lib/meetings';
import style from './MeetingList.module.css';
import MeetingItem from '@/app/meetings/MeetingItem';
import Filter from '@/app/components/Filter';
import useFilter from '@/hooks/useFilter';
import { useEffect, useState } from 'react';
import { Meetings } from '@/types/meetings';
export default function FilterMeetingList({ keyword, category }: { keyword?: string; category?: string }) {
  // api 데이터를 저장하는 배열
  const [meetings, setMeetings] = useState<Meetings[]>([]);

  // api 호출해서 모임 정보를 가져오는 useEffect (카테고리가 변경될 때마다 다시 호출)
  useEffect(() => {
    const fetchMeetings = async () => {
      const res = await getMeetings(keyword, category);
      if (res.ok === 1) {
        setMeetings(res.item);
      }
    };
    fetchMeetings();
  }, [category]);

  // 필터링된 모임 가져오기(useFilter 사용) - 날짜, 성별, 나이대, 지역, 인원 필터링
  const { filteredMeetings, handleFilterChange } = useFilter(meetings);

  return (
    <>
      <div className={style.meetingBorder}>
        <div className={style.filterBar}>
          <Filter onFilterChanges={handleFilterChange} showCategory={false} />
        </div>
        {meetings ? (
          meetings.length > 0 ? (
            <ul className={style.meetingGrid}>
              {filteredMeetings.map((meeting) => (
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
    </>
  );
}
