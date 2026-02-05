'use server';
import { ErrorRes, ManageListRes } from '@/types/api';
import { updateTag } from 'next/cache';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

export type ActionState = { ok: 0 | 1; message: string } | null;

/**
 * 신청자 목록 승인 및 거절
 * @param {string} accessToken - 인증 토큰
 * @returns {Promise<ManageListRes | ErrorRes>} - 모임 목록 응답 객체
 */
export async function patchManage(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const accessToken = formData.get('accessToken');
  const _id = Number(formData.get('_id'));
  const state = formData.get('state');
  const memo = formData.get('memo');

  let data: ManageListRes | ErrorRes;

  try {
    const res = await fetch(`${API_URL}/seller/orders/${_id}`, {
      method: 'PATCH',
      headers: {
        'Client-Id': CLIENT_ID,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        state,
        memo,
      }),
    });
    data = await res.json();
    if (data.ok) {
      updateTag('seller/orders');
      return { ok: 1, message: '처리가 완료되었습니다.' };
    }
    return { ok: 0, message: (data as ErrorRes).message };
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 승인 처리에 실패했습니다.' };
  }
}
