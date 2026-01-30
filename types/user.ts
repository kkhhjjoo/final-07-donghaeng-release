// 사용자 정보 인터페이스
export interface User {
  _id: number;
  email: string;
  name: string;
  region: string;
  age: number;
  gender: string;
  image?: string;
  comment: string;
  bpm: number;
  token?: {
    accessToken: string;
    refreshToken: string;
  };
}

// 회원가입 폼 타입
export type SignupForm = {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
  region: string;
  age: 'teen' | 'twenties' | 'thirties' | 'forties_plus';
  gender: 'm' | 'f';
};

// 로그인 폼 타입
export type LoginForm = Pick<User, 'email'> & {
  password: string;
};

// 사용자 상태 관리용
export interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  resetUser: () => void;
}
