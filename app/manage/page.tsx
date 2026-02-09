import style from './ManageAllPage.module.css';
import DefaultLayout from '@/app/components/DefaultLayout';
import ManageContent from './ManageContent';

export default function ManageAllPage() {
  return (
    <DefaultLayout>
      <main className={style.container}>
        <div className={style.contentWrapper}>
          <h1 className={style.title}>등록 모임</h1>
          <ManageContent />
        </div>
      </main>
    </DefaultLayout>
  );
}
