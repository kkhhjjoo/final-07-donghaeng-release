'use client';

import Image from 'next/image';
import Link from 'next/link';
import img from './sampleImg.png';
import DefaultLayout from '@/app/components/DefaultLayout';
import styles from './notifications.module.css';

export default function Notifications() {
  return (
    <DefaultLayout>
      <main className={styles['main']}>
        <div className={styles['notifications-wrap']}>
          <h2>알림</h2>
          <div className={styles['btn']}>
            <button>전체 읽음</button>
            <button>전체 삭제</button>
          </div>

          <Link href={`/meetings/1`} className={styles['alert']}>
            {/* 링크 하드코딩 */}
            <Image className={styles['img']} src={img} width="240" height="130" alt="알림 이미지" />
            <div className={styles['txt']}>
              <span>세상에서 제일 비싼 두쫀쿠 만들기</span>
              <p>모임에 승인되었습니다.</p>
            </div>
            <svg width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.7233 5.70592C17.0922 5.31548 17.0922 4.6814 16.7233 4.29096L12.9454 0.292831C12.5764 -0.0976105 11.9773 -0.0976105 11.6083 0.292831C11.2394 0.683273 11.2394 1.31735 11.6083 1.70779L13.7747 4.00047H0.944485C0.422067 4.00047 0 4.44713 0 5C0 5.55287 0.422067 5.99953 0.944485 5.99953H13.7747L11.6083 8.29221C11.2394 8.68265 11.2394 9.31673 11.6083 9.70717C11.9773 10.0976 12.5764 10.0976 12.9454 9.70717L16.7233 5.70904V5.70592Z"
                fill="black"
              />
            </svg>
          </Link>
          <div className={styles['alert']}>
            <Image className={styles['img']} src={img} alt="알림 이미지" />
            <div className={styles['txt']}>
              <span>세상에서 제일 비싼 두쫀쿠 만들기 글자수 넘어가니?</span>
              <p>모임에 승인되었습니다.</p>
            </div>
            <svg width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.7233 5.70592C17.0922 5.31548 17.0922 4.6814 16.7233 4.29096L12.9454 0.292831C12.5764 -0.0976105 11.9773 -0.0976105 11.6083 0.292831C11.2394 0.683273 11.2394 1.31735 11.6083 1.70779L13.7747 4.00047H0.944485C0.422067 4.00047 0 4.44713 0 5C0 5.55287 0.422067 5.99953 0.944485 5.99953H13.7747L11.6083 8.29221C11.2394 8.68265 11.2394 9.31673 11.6083 9.70717C11.9773 10.0976 12.5764 10.0976 12.9454 9.70717L16.7233 5.70904V5.70592Z"
                fill="black"
              />
            </svg>
          </div>

          {/* <!-- #TODO 하드코딩. 샘플이미지 변경 필요. --> */}
        </div>
      </main>
    </DefaultLayout>
  );
}
