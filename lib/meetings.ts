import { ApplyListRes, ErrorRes, MeetingsInfoRes, MeetingsListRes } from '@/types/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

/**
 * 게시판 타입에 해당하는 모임 목록 조회
 * @param {string} keyword - 검색 키워드 (선택)
 * @returns {Promise<MeetingsListRes | ErrorRes>} - 모임 목록 응답 객체
 */
export async function getMeetings(keyword?: string, category?: string): Promise<MeetingsListRes | ErrorRes> {
  try {
    const params = new URLSearchParams();
    switch (category) {
      case 'all':
        break;
      case 'health':
        params.append('custom', `{"extra.category": "운동"}`);
        break;
      case 'cook':
        params.append('custom', `{"extra.category": "요리 / 제조"}`);
        break;
      case 'festival':
        params.append('custom', `{"extra.category": "문화 / 공연 / 축제"}`);
        break;
      case 'arcade':
        params.append('custom', `{"extra.category": "게임 / 오락"}`);
        break;
      case 'book':
        params.append('custom', `{"extra.category": "인문학 / 책 / 글"}`);
        break;
      case 'outdoor':
        params.append('custom', `{"extra.category": "아웃도어 / 여행"}`);
        break;
      case 'social':
        params.append('custom', `{"extra.category": "사교"}`);
        break;
      case 'music':
        params.append('custom', `{"extra.music": "음악 / 악기"}`);
        break;
      case 'job':
        params.append('custom', `{"extra.category": "업종 / 직무"}`);
        break;
      case 'language':
        params.append('custom', `{"extra.category": "외국 / 언어"}`);
        break;
      case 'make':
        params.append('custom', `{"extra.category": "공예 / 만들기"}`);
        break;
      case 'dance':
        params.append('custom', `{"extra.category": "댄스 / 무용"}`);
        break;
      case 'volunteer':
        params.append('custom', `{"extra.category": "봉사활동"}`);
        break;
      case 'picture':
        params.append('custom', `{"extra.category": "사진 / 영상"}`);
        break;
      case 'self':
        params.append('custom', `{"extra.category": "자기계발"}`);
        break;
      case 'sports':
        params.append('custom', `{"extra.category": "스포츠 관람"}`);
        break;
      case 'pet':
        params.append('custom', `{"extra.category": "반려동물"}`);
        break;
      case 'bike':
        params.append('custom', `{"extra.category": "자동차 / 바이크"}`);
        break;
      default:
        break;
    }
    if (keyword) {
      // keyword가 존재하면 params에 keyword 파라미터를 추가
      params.set('keyword', keyword);
    }
    params.set('populate', 'seller_id');

    const queryString = params.toString();
    const url = queryString ? `${API_URL}/products?${queryString}` : `${API_URL}/products`;

    const res = await fetch(url, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
      cache: 'no-store',
    });
    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 게시물 목록 조회에 실패했습니다.' };
  }
}

/**
 * 특정 모임의 상세 정보 조회
 * @param {string} _id - 모임 ID
 * @returns {Promise<MeetingsInfoRes | ErrorRes>} - 모임 상세 정보 응답 객체
 */
export async function getDetail(_id: string): Promise<MeetingsInfoRes | ErrorRes> {
  try {
    const res = await fetch(`${API_URL}/products/${_id}`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
      cache: 'force-cache',
      next: {
        tags: [`products/${_id}`],
      },
    });
    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 게시물 상세 조회에 실패했습니다.' };
  }
}
/**
 * 사용자가 했던 모임 리스트 조회
 * @param {string} accessToken - 인증 토큰
 * @returns {Promise<ApplyListRes | ErrorRes>} - 모임 목록 응답 객체
 */
export async function getMyMeetings(accessToken: string): Promise<ApplyListRes | ErrorRes> {
  try {
    const custom = encodeURIComponent(JSON.stringify({ state: 'OS040' }));
    // state 파라미터가 없어서 찾아보니 custom query를 사용하면 된다고함.
    // 객체를 문자열로 변환후에 URL로 인코딩하여 전달하니 원하는대로 나오게 되었다.
    const res = await fetch(`${API_URL}/orders?custom=${custom}`, {
      headers: {
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
      next: {
        tags: [`orders`],
      },
    });
    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 사용자 모임 목록 조회에 실패했습니다.' };
  }
}
/**
 * 사용자가 등록한 모임 리스트 조회
 * @param {string} accessToken - 인증 토큰
 * @returns {Promise<MeetingsListRes | ErrorRes>} - 모임 목록 응답 객체
 */
export async function getMyAddMeetings(accessToken: string): Promise<MeetingsListRes | ErrorRes> {
  try {
    const res = await fetch(`${API_URL}/seller/products`, {
      headers: {
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });
    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 사용자 모임 목록 조회에 실패했습니다.' };
  }
}

/**
 * 사용자가 등록한 모임 상세 조회
 * @param {string} accessToken - 인증 토큰
 * @param {number} productId - 상품 ID
 * @returns {Promise<MeetingsInfoRes | ErrorRes>} - 상품 상세 정보 응답 객체
 */
export async function getSellerProduct(accessToken: string, productId: number): Promise<MeetingsInfoRes | ErrorRes> {
  try {
    const res = await fetch(`${API_URL}/seller/products/${productId}`, {
      headers: {
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 상품 조회에 실패했습니다.' };
  }
}
