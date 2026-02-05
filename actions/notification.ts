'use server';
import { ErrorRes, NotificationListRes } from '@/types/api';
import { updateTag } from 'next/cache';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

export type ActionState = { ok: 0 | 1; message: string } | null;

/**
 * 알림 생성
 * @param {string} accessToken - 인증 토큰
 * @returns {Promise<NotificationListRes | ErrorRes>} - 알림 응답 객체
 */

export async function createNoti(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const accessToken = formData.get('accessToken');
  formData.delete('accessToken');

  // FormData를 객체로 변환
  const body = Object.fromEntries(formData.entries());

  // 응답 객체 선언
  let data: NotificationListRes | ErrorRes;

  // API 호출
  try {
    const res = await fetch(`${API_URL}/notifications`, {
      method: 'POST',
      headers: {
        'Client-Id': CLIENT_ID,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      // body에 정보 담기(타입, 신청자 id, 모임 승인 여부 content, 모임 id, 제목, 이미지)
      body: JSON.stringify({
        type: body.type || 'noti',
        target_id: Number(body.target_id),
        content: body.content,
        extra: {
          meetingId: body.meetingId,
          meetingTitle: body.meetingTitle,
          mainImages: body.mainImages,
        },
      }),
    });
    data = await res.json();
    if (data.ok) {
      // updateTag('seller/orders');
      return { ok: 1, message: '처리가 완료되었습니다.' };
    }
    return { ok: 0, message: (data as ErrorRes).message };
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 승인 처리에 실패했습니다.' };
  }
}

// 전체 읽음 처리
export async function notiAllRead(accessToken: string) {
  try {
    // 내 알림 목록 전체를 읽음 상태로 수정
    const res = await fetch(`${API_URL}/notifications/read`, {
      method: 'PATCH',
      headers: {
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('전체 읽음 처리 실패:', error);
    return { ok: 0 };
  }
}

// 개별 읽음 처리
export async function notiOneRead(accessToken: string, notiId: string) {
  try {
    // 특정 알림을 읽음 상태로 수정
    const res = await fetch(`${API_URL}/notifications/${notiId}/read`, {
      method: 'PATCH',
      headers: {
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    console.log('개별 읽음 처리 성공:', data);
    return data;
  } catch (error) {
    console.error('개별 읽음 처리 실패:', error);
    return { ok: 0 };
  }
}
