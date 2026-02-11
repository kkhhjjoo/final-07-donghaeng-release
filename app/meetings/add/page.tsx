// app/meetings/create/page.tsx (서버 컴포넌트)
import DefaultLayout from '@/app/components/DefaultLayout';
import CreateForm from './Add';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '모임 등록',
  description: '새로운 모임을 등록하고 사람들을 모아보세요.',
  robots: { index: false, follow: false },
};

export default function CreatePage() {
  return (
    <DefaultLayout>
      <CreateForm />
    </DefaultLayout>
  );
}
