'use client';

import BookmarkButton from '@/app/components/BookmarkButton';
import style from './MeetingList.module.css';
import Link from 'next/link';
import { Meetings } from '@/types/meetings';
import { formatDate } from '@/lib/common';

export default function MeetingItem({ meeting }: { meeting: Meetings }) {
  console.log('meeting', meeting);
  return (
    <>
      <li className={style.card}>
        <Link href={`/meetings/${meeting._id}`}>
          <figure className={style.meetingCard}>
            <div
              className={style.cardImage}
              style={{
                backgroundImage: meeting.mainImages?.[0]?.path ? `url(${meeting.mainImages[0].path})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
            <figcaption className={style.cardContent}>
              <div className={style.cardHeader}>
                <h3 className={style.cardTitle}>{meeting.name}</h3>
                <div className={style.bookmarkIcon}>
                  <BookmarkButton desktopWidth={27} desktopHeight={35} meetingId={meeting._id} />
                </div>
              </div>
              <ul className={style.cardMetadata}>
                <div className={style.rowWrap}>
                  <li className={style.metadataLine}>{formatDate(meeting.extra.date)}</li>
                  <li className={style.divider}></li>
                  <li className={style.metadataLine}>{meeting.extra.gender}</li>
                  <li className={style.divider}></li>
                  <li className={style.metadataLine}>{meeting.extra.age}대</li>
                </div>
                <div className={style.rowWrap}>
                  <li className={style.metadataLine2}>{meeting.extra.region}</li>
                </div>
              </ul>
            </figcaption>
          </figure>
        </Link>
      </li>
    </>
  );
}
