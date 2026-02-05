import style from './Detail.module.css';
import DefaultLayout from '@/app/components/DefaultLayout';
import Image from 'next/image';
import BookmarkButton from '@/app/components/BookmarkButton';
import { getDetail } from '@/lib/meetings';
import NavigateButton from '@/app/meetings/[id]/NavigateButton';
import { formatDate } from '@/lib/common';
import { getUserInfo } from '@/lib/user';
import Author from '@/app/components/ui/Author';

export const dynamic = 'force-dynamic';

export default async function Detail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await getDetail(id);

  console.log('아이템', res);
  if (res.ok === 0) {
    return (
      <DefaultLayout>
        <main className={style.main}>
          <p>해당 모임이 없습니다.</p>
        </main>
      </DefaultLayout>
    );
  }

  const meeting = res.item;

  // seller_id로 호스트 정보 가져오기
  const userRes = await getUserInfo(String(meeting.seller_id));

  if (userRes.ok === 0) {
    return (
      <DefaultLayout>
        <main className={style.main}>
          <p>호스트 정보를 가져올 수 없습니다.</p>
        </main>
      </DefaultLayout>
    );
  }

  const hostUser = userRes.item;

  console.log('hostUser.comment:', hostUser.comment);
  console.log('hostUser.bpm', hostUser.bpm);

  return (
    <DefaultLayout>
      <main className={style.main}>
        <div>
          <div className={style.contentCard}>
            <div className={style.cardHeader}>
              {/* 캐릭터 이미지 */}
              <figure className={style.characterWrapper}>
                {meeting.mainImages && meeting.mainImages[0] && <Image src={meeting.mainImages[0].path} alt={meeting.mainImages[0].name} fill className={style.characterImage} unoptimized />}
                <figcaption className={'sr-only'}>캐릭터 이미지</figcaption>
              </figure>

              {/* 타이틀 + 메타정보 */}
              <div className={style.headerContent}>
                <h1 className={style.title}>{meeting.name}</h1>

                {/* meetingInfo */}
                <ul className={style.meetingInfo}>
                  <li className={style.meetingInfoCategory}>#{meeting.extra.category}</li>
                  <li className={style.meetingInfoDivider} aria-hidden="true">
                    |
                  </li>
                  <li>{meeting.extra.region}</li>
                  <li className={style.meetingInfoDot} aria-hidden="true">
                    ·
                  </li>
                  <li>{meeting.extra.age}대</li>
                  <li className={style.meetingInfoDot} aria-hidden="true">
                    ·
                  </li>
                  <li>{meeting.extra.gender}</li>
                  <li className={style.meetingInfoDot} aria-hidden="true">
                    ·
                  </li>
                  <li>
                    {meeting.buyQuantity}명/{meeting.quantity}명
                  </li>
                  <li className={style.meetingInfoDot} aria-hidden="true">
                    ·
                  </li>
                  <li>{formatDate(meeting.extra.date)}</li>
                </ul>
              </div>

              {/* 북마크 버튼 */}
              <div className={style.bookmarkPart}>
                <BookmarkButton meetingId={meeting._id} width={27} height={35} desktopWidth={40} desktopHeight={45} />
              </div>
            </div>

            {/* 본문 콘텐츠 */}
            <div className={style.contentBody}>
              <p>{meeting.content}</p>
            </div>
          </div>

          {/* 호스트 정보 섹션 */}
          <div className={style.bottomSection}>
            <figure className={style.userCharacterWrapper}>
              {/* 호스트 프로필 이미지 */}
              {hostUser.image ? <Image src={hostUser.image} alt={`${hostUser.name} 프로필`} width={170} height={150} className={style.userCharacterImage} style={{ objectFit: 'cover', borderRadius: '25px' }} unoptimized /> : <div className={style.userCharacterImage}></div>}
              <figcaption className={'sr-only'}>사용자 캐릭터</figcaption>
            </figure>

            <div className={style.hostInfo}>
              <div className={style.statusRow}>
                <div className={style.hostNameRow}>
                  {/* 호스트 이름 */}
                  <p className={style.userName}>{hostUser.name}</p>

                  {/* BPM 정보 */}
                  <div className={style.userStatus}>
                    <span className={style.heartIcon} aria-hidden="true"></span>
                    <div className={style.bpm}>
                      <p className={style.beatPoint}>{hostUser.bpm || 70}</p>
                      <p>BPM</p>
                    </div>
                  </div>
                </div>

                {/* 호스트 상태 메시지 */}
                <p className={style.statusText}>{hostUser.comment || '상태 메시지 없음'}</p>
              </div>

              {/* 채팅 버튼 */}
              <Author meeting={meeting} className={style.chatButton}>
                <Image src="/icon/chatting.svg" width={56} height={56} alt="채팅" aria-hidden="true" />
              </Author>
            </div>
          </div>

          <NavigateButton meeting={meeting} />
        </div>
      </main>
    </DefaultLayout>
  );
}
