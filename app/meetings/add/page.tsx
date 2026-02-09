// app/meetings/create/page.tsx (서버 컴포넌트)
import DefaultLayout from '@/app/components/DefaultLayout';
import CreateForm from './Add';

export default function CreatePage() {
  return (
    <DefaultLayout>
      <CreateForm />
    </DefaultLayout>
  );
}
