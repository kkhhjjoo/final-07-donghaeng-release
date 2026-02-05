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
                  <BookmarkButton width={27} height={35} meetingId={meeting._id} />
                </div>
              </div>
              <div className={style.cardMetadata}>
                <p className={style.metadataLine}>
                  {meeting.extra.region}. {formatDate(meeting.extra.date)}
                </p>
                <p className={style.metadataLine}>
                  {meeting.extra.gender}. {meeting.extra.age}대
                </p>
              </div>
            </figcaption>
          </figure>
        </Link>
      </li>
    </>
  );
}
