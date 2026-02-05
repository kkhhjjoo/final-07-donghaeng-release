import DefaultLayout from '@/app/components/DefaultLayout';
import { getDetail } from '@/lib/meetings';
import ApplyForm from './ApplyForm';

export default async function Apply({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await getDetail(id);

  if (res.ok === 0) {
    return (
      <DefaultLayout>
        <p>해당 모임이 없습니다.</p>
      </DefaultLayout>
    );
  }

  const meeting = res.item;
  console.log(meeting);

  return (
    <DefaultLayout>
      <ApplyForm meeting={meeting} id={id} />
    </DefaultLayout>
  );
}
