import EditForm from './Edit';
import { getDetail } from '@/lib/meetings';
import { notFound } from 'next/navigation';

export default async function EditMeetingPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const response = await getDetail(id);

  if (!response.ok) {
    notFound();
  }

  return <EditForm initialData={response.item} meetingId={id} />;
}
