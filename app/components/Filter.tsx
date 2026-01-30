'use client';

import { useState } from 'react';
import styles from './Filter.module.css';

// onFilterChanges prop을 받아오는데 props의 타입은 key: string, value: string 형태로 받아온다.
/*
showCategory는 카테고리를 보여줄지 감출지 선택할 수 있게 만든 props다
전달하지 않을 경우 기본값으로 true를 사용한다.
 */
export default function Filter({ onFilterChanges, showCategory = true }: { onFilterChanges: (key: string, value: string) => void; showCategory?: boolean }) {
  const [date, setDate] = useState('');

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
            <svg width="13" height="9" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.09227 11.5606C8.59433 12.1465 9.40968 12.1465 9.91175 11.5606L17.6235 2.56239C18.1255 1.97657 18.1255 1.02519 17.6235 0.439367C17.1214 -0.146456 16.306 -0.146456 15.804 0.439367L9 8.37844L2.19603 0.444053C1.69396 -0.14177 0.878612 -0.14177 0.376548 0.444053C-0.125516 1.02988 -0.125516 1.98125 0.376548 2.56708L8.08825 11.5653L8.09227 11.5606Z"
                fill="#c4d9ff"
              />
            </svg>
          </div>
        )}

        {/* 커스텀 날짜 선택 */}
        <div className={`${styles.wrapper} ${styles['date-wrapper']}`}>
          <span>{formatDate(date)}</span>
          <svg width="13" height="9" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.09227 11.5606C8.59433 12.1465 9.40968 12.1465 9.91175 11.5606L17.6235 2.56239C18.1255 1.97657 18.1255 1.02519 17.6235 0.439367C17.1214 -0.146456 16.306 -0.146456 15.804 0.439367L9 8.37844L2.19603 0.444053C1.69396 -0.14177 0.878612 -0.14177 0.376548 0.444053C-0.125516 1.02988 -0.125516 1.98125 0.376548 2.56708L8.08825 11.5653L8.09227 11.5606Z"
              fill="#c4d9ff"
            />
          </svg>
          <input
            type="date"
            className={styles.dateInput}
            min="2026-01-28"
            onChange={(e) => {
              (setDate(e.target.value), onFilterChanges('date', e.target.value));
            }}
          />
        </div>
        <div className={styles.wrapper}>
          <select name="성별" id="" defaultValue="" onChange={(e) => onFilterChanges('gender', e.target.value)}>
            <option value="">성별</option>
            <option value="남">남</option>
            <option value="여">여</option>
            <option value="남녀무관">남녀무관</option>
          </select>
          <svg width="13" height="9" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.09227 11.5606C8.59433 12.1465 9.40968 12.1465 9.91175 11.5606L17.6235 2.56239C18.1255 1.97657 18.1255 1.02519 17.6235 0.439367C17.1214 -0.146456 16.306 -0.146456 15.804 0.439367L9 8.37844L2.19603 0.444053C1.69396 -0.14177 0.878612 -0.14177 0.376548 0.444053C-0.125516 1.02988 -0.125516 1.98125 0.376548 2.56708L8.08825 11.5653L8.09227 11.5606Z"
              fill="#c4d9ff"
            />
          </svg>
        </div>
        <div className={styles.wrapper}>
          <select name="나이대" id="" defaultValue="" onChange={(e) => onFilterChanges('age', e.target.value)}>
            <option value="">나이대</option>
            <option value="10대">10대</option>
            <option value="20대">20대</option>
            <option value="30대">30대</option>
            <option value="40대 이상">40대 이상</option>
          </select>
          <svg width="13" height="9" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.09227 11.5606C8.59433 12.1465 9.40968 12.1465 9.91175 11.5606L17.6235 2.56239C18.1255 1.97657 18.1255 1.02519 17.6235 0.439367C17.1214 -0.146456 16.306 -0.146456 15.804 0.439367L9 8.37844L2.19603 0.444053C1.69396 -0.14177 0.878612 -0.14177 0.376548 0.444053C-0.125516 1.02988 -0.125516 1.98125 0.376548 2.56708L8.08825 11.5653L8.09227 11.5606Z"
              fill="#c4d9ff"
            />
          </svg>
        </div>
        <div className={styles.wrapper}>
          <select name="지역" id="" defaultValue="" onChange={(e) => onFilterChanges('region', e.target.value)}>
            <option value="">지역</option>
            <option value="종로구">종로구</option>
            <option value="강남구">강남구</option>
            <option value="송파구">송파구</option>
            <option value="마포구">마포구</option>
            <option value="관악구">관악구</option>
            <option value="중구">중구</option>
            <option value="용산구">용산구</option>
            <option value="성동구">성동구</option>
            <option value="광진구">광진구</option>
            <option value="동대문구">동대문구</option>
            <option value="중랑구">중랑구</option>
            <option value="성북구">성북구</option>
            <option value="강북구">강북구</option>
            <option value="도봉구">도봉구</option>
            <option value="노원구">노원구</option>
            <option value="은평구">은평구</option>
            <option value="서대문구">서대문구</option>
            <option value="양천구">양천구</option>
            <option value="강서구">강서구</option>
            <option value="구로구">구로구</option>
            <option value="금천구">금천구</option>
            <option value="영등포구">영등포구</option>
            <option value="동작구">동작구</option>
            <option value="서초구">서초구</option>
          </select>
          <svg width="13" height="9" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.09227 11.5606C8.59433 12.1465 9.40968 12.1465 9.91175 11.5606L17.6235 2.56239C18.1255 1.97657 18.1255 1.02519 17.6235 0.439367C17.1214 -0.146456 16.306 -0.146456 15.804 0.439367L9 8.37844L2.19603 0.444053C1.69396 -0.14177 0.878612 -0.14177 0.376548 0.444053C-0.125516 1.02988 -0.125516 1.98125 0.376548 2.56708L8.08825 11.5653L8.09227 11.5606Z"
              fill="#c4d9ff"
            />
          </svg>
        </div>
        <div className={styles.wrapper}>
          <select name="인원" id="" defaultValue="" onChange={(e) => onFilterChanges('quantity', e.target.value)}>
            <option value="">인원</option>
            <option value="1 ~ 10명">1 ~ 10명</option>
            <option value="11 ~ 20명">11 ~ 20명</option>
            <option value="21 ~ 30명">21 ~ 30명</option>
            <option value="30명 이상">30명 이상</option>
          </select>
          <svg width="13" height="9" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.09227 11.5606C8.59433 12.1465 9.40968 12.1465 9.91175 11.5606L17.6235 2.56239C18.1255 1.97657 18.1255 1.02519 17.6235 0.439367C17.1214 -0.146456 16.306 -0.146456 15.804 0.439367L9 8.37844L2.19603 0.444053C1.69396 -0.14177 0.878612 -0.14177 0.376548 0.444053C-0.125516 1.02988 -0.125516 1.98125 0.376548 2.56708L8.08825 11.5653L8.09227 11.5606Z"
              fill="#c4d9ff"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
