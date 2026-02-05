'use server';
import { ErrorRes, UserInfoRes } from '@/types/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!;

type UserActionState = UserInfoRes | ErrorRes | null;

/**
 * 로그인
 * @param state - 이전 상태(사용하지 않음)
 * @param formData - 로그인 폼 데이터(FormData 객체)
 * @returns 로그인 결과 응답 객체
 * @description
 * 이메일/비밀번호로 로그인 API 호출
 */
export async function login(state: UserActionState, formData: FormData): Promise<UserActionState> {
  const body = Object.fromEntries(formData.entries());

  let res: Response;
  let data: UserInfoRes | ErrorRes;

  try {
    // 로그인 API 호출
    res = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }

  return data;
}

/**
 * 회원가입
 * @param state - 이전 상태(사용하지 않음)
 * @param formData - 회원가입 폼 데이터(FormData 객체)
 * @returns 회원가입 결과 응답 객체
 * @description
 * 첨부파일(프로필 이미지)이 있으면 파일 업로드 후 받은 파일경로를 회원 정보에 추가해서 회원가입 API를 호출
 */
export async function createUser(state: UserActionState, formData: FormData): Promise<UserActionState> {
  let res: Response;
  let data: UserInfoRes | ErrorRes;

  const body = Object.fromEntries(formData.entries());

  if (body.password !== body.passwordCheck) {
    return { ok: 0, message: '비밀번호가 일치하지 않습니다.' };
  }

  try {
    // 회원가입 요청 바디 생성
    // API 참고: https://fesp-api.koyeb.app/market/apidocs/#/%ED%9A%8C%EC%9B%90/post_users_
    const body = {
      type: formData.get('type') || 'user',
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      region: formData.get('region'),
      age: formData.get('age'),
      gender: formData.get('gender'),
    };

    // 회원가입 API 호출
    res = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
      },
      body: JSON.stringify(body),
    });

    const text = await res.text(); // JSON 파싱 에러 방지...
    console.log('📦 Response:', text);

    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      return { ok: 0, message: '서버 응답 형식이 올바르지 않습니다.' };
    }
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }

  return data;
}

/**
 * 프로필 수정
 * @param state - 이전 상태(사용하지 않음)
 * @param formData - 프로필 수정 폼 데이터(FormData 객체)
 * @returns 프로필 수정 결과 응답 객체
 * @description
 * 기존 유저 정보를 수정 후 완료 버튼을 누르면 마이 페이지로 리다이렉트
 * 실패시 에러 메시지 반환
 */
export async function updateUser(state: UserActionState, formData: FormData): Promise<UserActionState> {
  let res: Response;
  let data: UserInfoRes | ErrorRes;
  const accessToken = formData.get('accessToken');
  const _id = formData.get('_id');
  formData.delete('accessToken');
  formData.delete('_id');

  const body = {
    email: formData.get('email'),
    image: formData.get('image'),
    name: formData.get('name'),
    comment: formData.get('comment'),
    region: formData.get('region'),
    age: formData.get('age'),
    gender: formData.get('gender'),
  };

  try {
    res = await fetch(`${API_URL}/users/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (err) {
    console.error(err);
    return { ok: 0, message: '일시적인 네트워크 문제로 프로필 수정에 실패했습니다.' };
  }

  return data;
}
