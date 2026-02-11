import DefaultLayout from '@/app/components/DefaultLayout';
import ChatMain from './ChatMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '채팅',
  description: '주최자와 신청자가 실시간으로 소통하는 채팅 서비스입니다.',
  robots: { index: false, follow: false },
};

export default async function ChatPage({ searchParams }: { searchParams: Promise<{ meeting_id?: string; user_id?: string }> }) {
  const { meeting_id, user_id } = await searchParams;

  return (
    <DefaultLayout hideFooter>
      <ChatMain meetingId={meeting_id} userId={user_id} />
    </DefaultLayout>
  );
}
