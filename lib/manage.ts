import { ErrorRes, ManageListRes } from '@/types/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';
/**
 * 신청자 목록 조회
 * @param {string} accessToken - 인증 토큰
 * @returns {Promise<ManageListRes | ErrorRes>} - 모임 목록 응답 객체
 */
export async function getManage(accessToken: string): Promise<ManageListRes | ErrorRes> {
  try {
    const res = await fetch(`${API_URL}/seller/orders?state=OS020`, {
      headers: {
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'force-cache',
    });
    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 사용자 모임 목록 조회에 실패했습니다.' };
  }
}
