'use server';

import { ErrorRes, MeetingsInfoRes } from '@/types/api';
import { updateTag } from 'next/cache';
import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

export type ActionState = { ok: 0 | 1; message: string } | null;

/**
 * 모임 지원
 * @param {ActionState} prevState - 이전 상태(사용하지 않음)
 * @param {FormData} formData - 모임 지원 정보를 담은 FormData 객체
 * @returns {Promise<ActionState>} - 생성 결과 응답 객체
 * @throws {Error} - 네트워크 오류 발생 시
 * @description
 * 모임을 지원하고, 성공 시 모임 목록으로 리다이렉트
 * 실패 시 에러 메시지를 반환
 */
export async function createApply(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const accessToken = formData.get('accessToken');
  const productsStr = formData.get('products') as string;
  const extraStr = formData.get('extra') as string;

  const body = {
    products: productsStr ? JSON.parse(productsStr) : undefined,
    extra: extraStr ? JSON.parse(extraStr) : undefined,
  };

  let res: Response;
  let data: MeetingsInfoRes | ErrorRes;

  try {
    res = await fetch(`${API_URL}/orders`, {
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

  if (data.ok) {
    updateTag('orders');
    return { ok: 1, message: '신청이 완료되었습니다.' };
  } else {
    return data; // 에러 응답 객체 반환
  }
}

/**
 * 모임 등록
 * @param {ActionState} prevState - 이전 상태(사용하지 않음)
 * @param {FormData} formData - 모임 등록 정보를 담은 FormData 객체
 * @returns {Promise<ActionState>} - 생성 결과 응답 객체
 * @throws {Error} - 네트워크 오류 발생 시
 * @description
 * 새로운 모임을 등록하고, 성공 시 모임 목록으로 리다이렉트
 * 실패 시 에러 메시지를 반환
 */
export async function createMeeting(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const accessToken = formData.get('accessToken');
  formData.delete('accessToken');

  // JSON 문자열을 파싱해서 객체로 변환
  const mainImagesStr = formData.get('mainImages') as string;
  const extraStr = formData.get('extra') as string;

  const body = {
    price: Number(formData.get('price')),
    shippingFees: Number(formData.get('shippingFees') || 0),
    name: formData.get('name'),
    content: formData.get('content'),
    quantity: Number(formData.get('quantity')),
    mainImages: mainImagesStr ? JSON.parse(mainImagesStr) : undefined,
    extra: extraStr ? JSON.parse(extraStr) : undefined,
  };

  let res: Response;
  let data: MeetingsInfoRes | ErrorRes;

  try {
    res = await fetch(`${API_URL}/seller/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    // 에러 응답 상세 로깅 추가
    if (!res.ok) {
      const errorText = await res.text();
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('❌ API 에러 응답 (422):');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

      try {
        const errorData = JSON.parse(errorText);
        console.error('에러 데이터:', JSON.stringify(errorData, null, 2));
      } catch {
        console.error('응답 본문:', errorText);
      }

      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    }

    data = await res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 모임 등록에 실패했습니다.' };
  }

  if (data.ok) {
    updateTag('products');
    updateTag('seller/products');
    redirect(`/meetings`); // 모임 목록 페이지로 리다이렉트
  } else {
    return data; // 에러 응답 객체 반환
  }
}

/**
 * 모임 수정
 * @param {ActionState} prevState - 이전 상태(사용하지 않음)
 * @param {FormData} formData - 모임 수정 정보를 담은 FormData 객체
 * @returns {Promise<ActionState>} - 수정 결과 응답 객체
 * @throws {Error} - 네트워크 오류 발생 시
 * @description
 * 기존 모임을 수정하고, 성공 시 모임 목록으로 리다이렉트
 * 실패 시 에러 메시지를 반환
 */
export async function updateMeeting(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const accessToken = formData.get('accessToken');
  const _id = formData.get('_id');
  formData.delete('accessToken');
  formData.delete('_id');

  const mainImagesStr = formData.get('mainImages') as string;
  const extraStr = formData.get('extra') as string;

  const body = {
    price: Number(formData.get('price')),
    shippingFees: Number(formData.get('shippingFees') || 0),
    name: formData.get('name'),
    content: formData.get('content'),
    quantity: Number(formData.get('quantity')),
    mainImages: mainImagesStr ? JSON.parse(mainImagesStr) : undefined,
    extra: extraStr ? JSON.parse(extraStr) : undefined,
  };

  let res: Response;
  let data: MeetingsInfoRes | ErrorRes;

  try {
    res = await fetch(`${API_URL}/seller/products/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 모임 수정에 실패했습니다.' };
  }

  if (data.ok) {
    updateTag('products');
    updateTag(`products/${_id}`);
    redirect(`/meetings/${_id}`); // 모임 상세페이지로 리다이렉트
  } else {
    return data; // 에러 응답 객체 반환
  }
}

/**
 * 모임 삭제
 * @param {ActionState} prevState - 이전 상태(사용하지 않음)
 * @param {FormData} formData - 모임 삭제 정보를 담은 FormData 객체
 * @returns {Promise<ActionState>} - 삭제 결과 응답 객체
 * @throws {Error} - 네트워크 오류 발생 시
 * @description
 * 모임을 삭제하고, 성공 시 모임 목록으로 리다이렉트
 * 실패 시 에러 메시지를 반환
 */
export async function deleteMeeting(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const accessToken = formData.get('accessToken');
  const _id = formData.get('_id');

  let res: Response;
  let data: MeetingsInfoRes | ErrorRes;

  try {
    res = await fetch(`${API_URL}/seller/products/${_id}`, {
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
    return { ok: 0, message: '일시적인 네트워크 문제로 모임 삭제에 실패했습니다.' };
  }

  if (data.ok) {
    updateTag('products');
    updateTag(`products/${_id}`);
    redirect(`/meetings`); // 모임 목록 페이지로 리다이렉트
  } else {
    return data; // 에러 응답 객체 반환
  }
}

/**
 * 상품 buyQuantity 업데이트
 * @param {string} accessToken - 인증 토큰
 * @param {number} productId - 상품 ID
 * @param {number} buyQuantity - 업데이트할 buyQuantity 값
 * @returns {Promise<ActionState>} - 업데이트 결과 응답 객체
 */
export async function updateBuyQuantity(accessToken: string, productId: number, buyQuantity: number): Promise<ActionState> {
  try {
    const res = await fetch(`${API_URL}/seller/products/${productId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ buyQuantity }),
    });

    const data = await res.json();
    if (data.ok) {
      updateTag('products');
      updateTag(`products/${productId}`);
      return { ok: 1, message: 'buyQuantity 업데이트 완료' };
    }
    return { ok: 0, message: data.message || 'buyQuantity 업데이트 실패' };
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '네트워크 오류로 buyQuantity 업데이트에 실패했습니다.' };
  }
}
