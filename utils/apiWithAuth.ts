import useUserStore from '@/zustand/userStore';

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
}
// fetch가 원래 받던 옵션들 + 추가할 옵션을 합치기 위해 extend RequestInit 을 사용

export async function fetchWithAuth(url: string, options: FetchOptions = {}) {
  const { user, refreshAccessToken, resetUser } = useUserStore.getState();

  const accessToken = user?.token?.accessToken;

  if (!accessToken && options.requireAuth) {
    throw new Error('로그인이 필요합니다');
  }

  /*
  // 예시 1: 에러 발생 
  fetchWithAuth('/api/bookmarks', { requireAuth: true })
  // accessToken 없음 + requireAuth: true → 에러!

  // 예시 2: 에러 안 남 
  fetchWithAuth('/api/posts', { requireAuth: false })
  // accessToken 없어도 requireAuth가 false → 통과!

  // 예시 3: 에러 안 남 
  fetchWithAuth('/api/bookmarks', { requireAuth: true })
  // accessToken 있음 + requireAuth: true → 통과!

  */

  // 헤더에 토큰 추가
  const headers = {
    ...options.headers, //원래 헤더를 유지하면서 헤더를 추가하려고 사용
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    /* 
    accessToken 있으면 → { Authorization: 'Bearer token123' }
    accessToken 없으면 → false
    */
  };

  let response = await fetch(url, {
    ...options, // 모든 옵션을 유지한채로 헤더를 만든걸로 덮어씀
    headers,
  });
  // 모든 옵션을 유지한채로 헤더를 만든걸로 덮어씀

  // 401 에러 발생 시 토큰 갱신 후 재시도
  if (response.status === 401 && options.requireAuth) {
    console.log('401 에러 발생, 토큰 갱신 시도...');

    const refreshSuccess = await refreshAccessToken();
    // refreshToken으로 서버에 새 accessToken 요청
    // 성공하면 true, 실패하면 false

    if (refreshSuccess) {
      // 갱신된 토큰으로 재시도
      const newAccessToken = useUserStore.getState().user?.token?.accessToken;

      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
      });

      // 새로운 토큰으로 원래요청을 다시 보냄

      console.log('토큰 갱신 후 재시도 완료');
    } else {
      // 갱신 실패 시 로그아웃
      console.log('토큰 갱신 실패, 로그인 페이지로 이동');
      resetUser();

      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }

      throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
    }
  }

  return response;
}
