import { BookmarksInfoRes, ErrorRes } from './../types/api';
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

type ActionState = ErrorRes | null;

/**
 * 북마크 추가
 * @param {ActionState} prevState - 이전 상태(사용하지 않음)
 * @param {FormData} formData - 북마크 정보를 담은 FormData 객체
 * @returns {Promise<ActionState>} - 생성 결과 응답 객체
 * @throws {Error} - 네트워크 오류 발생 시
 * @description
 * 실패 시 에러 메시지를 반환
 */
export async function addBookmarks(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const accessToken = formData.get('accessToken');
  formData.delete('accessToken');

  // FormData를 일반 Object로 변환
  const body = Object.fromEntries(formData.entries());

  let res: Response;
  let data: BookmarksInfoRes | ErrorRes;

  try {
    res = await fetch(`${API_URL}/bookmarks/product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
    console.log(data);
    console.log(accessToken);
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 등록에 실패했습니다.' };
  }

  // redirect()는 예외를 throw 해서 처리하는 방식이라서 try 문에서 사용하면 catch로 처리되므로 제대로 동작하지 않음
  // 따라서 try 문 밖에서 사용해야 함
  if (data.ok) {
    return null; // 성공 시 null 반환
  } else {
    return data; // 에러 응답 객체 반환
  }
}

/**
 * 북마크 삭제
 * @param {ActionState} prevState - 이전 상태(사용하지 않음)
 * @param {FormData} formData - 북마크 ID와 액세스 토큰을 담은 FormData 객체
 * @returns {Promise<ActionState>} - 삭제 결과 응답 객체
 * @throws {Error} - 네트워크 오류 발생 시
 * @description
 * 실패 시 에러 메시지를 반환
 */
export async function deleteBookmark(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const accessToken = formData.get('accessToken');
  const _id = formData.get('_id');

  let res: Response;
  let data: BookmarksInfoRes | ErrorRes;

  try {
    res = await fetch(`${API_URL}/bookmarks/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    data = await res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 삭제에 실패했습니다.' };
  }

  if (data.ok) {
    return null; // 성공 시 null 반환
  } else {
    return data; // 에러 응답 객체 반환
  }
}
