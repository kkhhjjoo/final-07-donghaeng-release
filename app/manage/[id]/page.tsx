import styles from './Manage.module.css';
import DefaultLayout from '@/app/components/DefaultLayout';
import ManageContent from './ManageContent';

interface ManagePageProps {
  params: Promise<{ id: string }>;
}

export default async function ManagePage({ params }: ManagePageProps) {
  const { id } = await params;
  const productId = Number(id);

  return (
    <DefaultLayout>
      <main className={styles['manage-body']}>
        <h1 className={styles['manage-title']}>신청자 목록</h1>
        <ManageContent productId={productId} />
      </main>
    </DefaultLayout>
  );
}
