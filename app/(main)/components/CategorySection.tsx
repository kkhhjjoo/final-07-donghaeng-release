import Image from 'next/image';
import Link from 'next/link';
import styles from '../Main.module.css';
import BookmarkButton from '@/app/components/BookmarkButton';
import { Meetings } from '@/types/meetings';

interface CategorySectionProps {
  title: string;
  meetings: Meetings[];
}

export default function CategorySection({ title, meetings }: CategorySectionProps) {
  return (
    <section className={styles[`section-meetings-wrapper`]}>
      <div className={styles[`section-link`]}>
        <Link href="/meetings" className={styles[`section-link-text`]}>
          {title}
          <Image src="/icon/right.svg" width={12} height={20} alt="오른쪽화살표" style={{ height: 'auto' }} />
        </Link>
      </div>
      <div className={styles[`section-list`]}>
        {meetings.map((meeting) => (
          <div key={meeting._id} className={styles[`meetings-wrapper`]}>
            <Link href={`/meetings/${meeting._id}`} className={styles[`meetings-image-box`]}>
              <Image src={meeting.mainImages[0].path} alt={meeting.name} fill sizes="(max-width: 1024px) 50vw, 25vw" />
              <BookmarkButton meetingId={meeting._id} desktopWidth={23} desktopHeight={29} />
            </Link>
            <Link href={`/meetings/${meeting._id}`} className={styles[`meetings-title`]}>
              {meeting.name}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
