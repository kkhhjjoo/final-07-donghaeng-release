'use client';

import { useState } from 'react';
import styles from './Filter.module.css';
import { regionData } from '@/docs/regionData';

// onFilterChanges prop을 받아오는데 props의 타입은 key: string, value: string 형태로 받아온다.
/*
showCategory는 카테고리를 보여줄지 감출지 선택할 수 있게 만든 props다
전달하지 않을 경우 기본값으로 true를 사용한다.
 */
export default function Filter({ onFilterChanges, showCategory = true }: { onFilterChanges: (key: string, value: string) => void; showCategory?: boolean }) {
  // 선택한 날짜를 저장하는 state
  const [date, setDate] = useState('');

  // 선택한 지역을 저장하는 state
  const [region, setRegion] = useState('');

  // 날짜 포맷 변환 (2026-01-28 -> 01.28)
  const formatDate = (dateString: string) => {
    if (!dateString) return '날짜';
    const [, month, day] = dateString.split('-');
    return `${month}.${day}`;
  };

  return (
    <>
      <div className={styles['filter-div']}>
        {showCategory && (
          <div className={`${styles.wrapper} ${styles['category-display']}`}>
            {/* onChange 이벤트를 통해 선택이 바뀔 때 마다 onFilterChanges를 호출하여 실행 */}
            <select name="카테고리" id="" defaultValue="" onChange={(e) => onFilterChanges('category', e.target.value)}>
              <option value="">카테고리</option>
              <option value="운동">운동</option>
              <option value="요리 / 제조">요리 / 제조</option>
              <option value="문화 / 공연 / 축제">문화 / 공연 / 축제</option>
              <option value="게임 / 오락">게임 / 오락</option>
              <option value="사교">사교</option>
              <option value="인문학 / 책 / 글">인문학 / 책 / 글</option>
              <option value="아웃도어 / 여행">아웃도어 / 여행</option>
              <option value="음악 / 악기">음악 / 악기</option>
              <option value="업종 / 직무">업종 / 직무</option>
              <option value="외국 / 언어">외국 / 언어</option>
              <option value="공예 / 만들기">공예 / 만들기</option>
              <option value="댄스 / 무용">댄스 / 무용</option>
              <option value="봉사활동">봉사활동</option>
              <option value="사진 / 영상">사진 / 영상</option>
              <option value="자기계발">자기계발</option>
              <option value="스포츠 관람">스포츠 관람</option>
              <option value="반려동물">반려동물</option>
              <option value="자동차 / 바이크">자동차 / 바이크</option>
            </select>
          </div>
        )}

        {/* 커스텀 날짜 선택 */}
        <div className={`${styles.wrapper} ${styles['date-wrapper']}`}>
          <span>{formatDate(date)}</span>

          <input
            type="date"
            className={styles.dateInput}
            min="2026-01-28"
            onChange={(e) => {
              (setDate(e.target.value), onFilterChanges('date', e.target.value));
            }}
          />
        </div>
        {/* 성별 선택 */}
        <div className={styles.wrapper}>
          <select name="성별" id="" defaultValue="" onChange={(e) => onFilterChanges('gender', e.target.value)}>
            <option value="">성별</option>
            <option value="남">남</option>
            <option value="여">여</option>
            <option value="남녀무관">남녀무관</option>
          </select>
        </div>
        {/* 나이대 선택 */}
        <div className={styles.wrapper}>
          <select name="나이대" id="" defaultValue="" onChange={(e) => onFilterChanges('age', e.target.value)}>
            <option value="">나이대</option>
            <option value="10대">10대</option>
            <option value="20대">20대</option>
            <option value="30대">30대</option>
            <option value="40대 이상">40대 이상</option>
          </select>
        </div>
        {/* 지역 선택 후 시/군/구 선택 */}
        <div className={styles.wrapper}>
          {/* 선택한 지역에 따라 state 변경 및 필터 진행 */}
          <select
            name="지역"
            onChange={(e) => {
              setRegion(e.target.value);
              onFilterChanges('region', e.target.value);
              onFilterChanges('district', '');
            }}
          >
            {/* Object.keys로 regionData의 key만 추출 후 map을 통해 요소 반환*/}
            <option value="">지역</option>
            {Object.keys(regionData).map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.wrapper}>
          {/* 지역을 선택하지 않으면 시/군/구 select는 disabled 상태 
          region을 통해 선택한 지역을 파악한 후 객체의 키를 통해 해당하는 배열을 가져와서 출력
          */}
          <select key={region} disabled={!region} onChange={(e) => onFilterChanges('district', e.target.value)}>
            <option value="">{region ? '시/군/구' : '지역을 선택해주세요'}</option>
            {region &&
              regionData[region].map((regionDetail) => (
                <option key={regionDetail} value={regionDetail}>
                  {regionDetail}
                </option>
              ))}
          </select>
        </div>
        {/* 모임 인원 선택 */}
        <div className={styles.wrapper}>
          <select name="인원" id="" defaultValue="" onChange={(e) => onFilterChanges('quantity', e.target.value)}>
            <option value="">인원</option>
            <option value="1 ~ 10명">1 ~ 10명</option>
            <option value="11 ~ 20명">11 ~ 20명</option>
            <option value="21 ~ 30명">21 ~ 30명</option>
            <option value="30명 이상">30명 이상</option>
          </select>
        </div>
      </div>
    </>
  );
}
