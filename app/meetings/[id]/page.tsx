import style from './Detail.module.css';
import DefaultLayout from '@/app/components/DefaultLayout';
import Image from 'next/image';
import BookmarkButton from '@/app/components/BookmarkButton';
import { getDetail } from '@/lib/meetings';
import NavigateButton from '@/app/meetings/[id]/NavigateButton';

export default async function Detail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await getDetail(id);

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

  return (
    <DefaultLayout>
      <main className={style.main}>
        <>
          <div className={style.contentCard}>
            <div className={style.cardHeader}>
              <figure className={style.characterWrapper}>
                {meeting.mainImages && meeting.mainImages[0] && <Image src={meeting.mainImages[0].path} alt={meeting.mainImages[0].name} fill className={style.characterImage} unoptimized />}
                <figcaption className={'sr-only'}>캐릭터 이미지</figcaption>
              </figure>
              <div className={style.titleSection}>
                <h1 className={style.title}>{meeting.name}</h1>
                <p className={style.dates}>{meeting.extra.date}</p>
              </div>
              <BookmarkButton meetingId={meeting._id} width={27} height={35} desktopWidth={40} desktopHeight={45} />
            </div>
            <div className={style.contentBody}>
              <p>{meeting.content}</p>
              <div className={style.meetingInfo}>
                <p>카테고리: {meeting.extra.category}</p>
                <p>지역: {meeting.extra.region}</p>
                <p>성별: {meeting.extra.gender}</p>
                <p>연령: {meeting.extra.age}세</p>
                <p>모집인원: {meeting.quantity}명</p>
                <p>신청인원: {meeting.buyQuantity}명</p>
              </div>
            </div>
          </div>

          <div className={style.bottomSection}>
            <figure className={style.userCharacterWrapper}>
              <div className={style.userCharacterImage}></div>
              <figcaption className={'sr-only'}>사용자 캐릭터</figcaption>
            </figure>
            <div className={style.infos}>
              <div className={style.wrapper}>
                <div className={style.info}>
                  <div className={style.userInfo}>
                    <p className={style.userName}>호스트 ID: {meeting.seller_id}</p>
                    <p className={style.statusText}>{meeting.extra.survey1 || '상태 메시지 없음'}</p>
                  </div>

                  <div className={style.userStatus}>
                    <span className={style.heartIcon} aria-hidden="true"></span>
                    <div className={style.bpm}>
                      <span>90</span>
                      <span>BPM</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={style.chatButton} aria-label="채팅하기">
                <Image src="/icon/chatting.svg" width={56} height={56} alt="채팅" aria-hidden="true" />
              </div>
            </div>
          </div>

          <NavigateButton meeting={meeting} />
        </>
      </main>
    </DefaultLayout>
  );
}
