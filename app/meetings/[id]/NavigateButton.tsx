'use client';

import Link from 'next/link';
import style from './Detail.module.css';
import useUserStore from '@/zustand/userStore';
import { Meetings } from '@/types/meetings';
import { useActionState } from 'react';
import { deleteMeeting } from '@/actions/meetings';

export default function NavigateButton({ meeting }: { meeting: Meetings }) {
  const user = useUserStore((state) => state.user);
  const [, formAction] = useActionState(deleteMeeting, null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) event.preventDefault();
  };

  return (
    <>
      {/* 호스트 여부에 따라 버튼 표시 */}
      <div className={style.buttonContainer}>
        {user?._id === meeting.seller_id ? (
          // 호스트일 때: 관리하기, 수정하기, 삭제하기
          <div className={style.hostMode}>
            <Link className={style.adminBtn} href={`/manage/${meeting._id}`}>
              관리하기
            </Link>
            <Link className={style.editBtn} href={`/meetings/${meeting._id}/edit`}>
              수정하기
            </Link>
            <form action={formAction} onSubmit={handleSubmit}>
              <input type="hidden" name="accessToken" value={user.token?.accessToken} />
              <input type="hidden" name="_id" value={meeting._id} />
              <button className={style.deleteBtn}>삭제하기</button>
            </form>
          </div>
        ) : (
          // 일반 사용자일 때: 신청하기
          <div className={style.userMode}>
            <Link className={style.applyBtn} href={`/meetings/${meeting._id}/apply`}>
              신청하기
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
