import { useState } from 'react';
import { Meetings } from '@/types/meetings';

export default function useFilter(meetings: Meetings[]) {
  // 필터 값을 저장하는 state
  const [filters, setFilters] = useState({
    category: '',
    date: '',
    gender: '',
    age: '',
    region: '',
    quantity: '',
  });

  // 필터 값이 바뀔 때 호출되는 함수
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // 필터 조건에 맞는 모임만 걸러내는 변수
  const filteredMeetings = meetings.filter((meeting) => {
    if (filters.category && meeting.extra.category !== filters.category) return false;
    if (filters.date && meeting.extra.date !== filters.date) return false;
    if (filters.gender && meeting.extra.gender !== filters.gender) return false;
    if (filters.age) {
      const ageGroup = meeting.extra.age >= 40 ? '40대 이상' : `${Math.floor(meeting.extra.age / 10) * 10}대`;
      if (ageGroup !== filters.age) return false;
    }
    if (filters.region && !meeting.extra.region.includes(filters.region)) return false;
    if (filters.quantity) {
      const q = meeting.quantity;
      if (filters.quantity === '1 ~ 10명' && (q < 1 || q > 10)) return false;
      if (filters.quantity === '11 ~ 20명' && (q < 11 || q > 20)) return false;
      if (filters.quantity === '21 ~ 30명' && (q < 21 || q > 30)) return false;
      if (filters.quantity === '30명 이상' && q < 30) return false;
    }
    return true;
  });

  // 외부에서 사용할 값들을 반환(필터링된 모임, 필터 값이 바뀔 때 호출되는 함수)
  return { filteredMeetings, handleFilterChange };
}
