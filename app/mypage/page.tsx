import MyPage from './MyPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '마이페이지',
  description: '나의 모임 활동과 프로필을 관리하세요.',
  robots: { index: false, follow: false },
};

export default function MyPageRoute() {
  return <MyPage />;
}
