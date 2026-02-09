import style from './Bookmarks.module.css';
import DefaultLayout from '@/app/components/DefaultLayout';
import BookmarkContent from './BookmarkContent';

export default function BookmarksPage() {
  return (
    <DefaultLayout>
      <main className={style.container}>
        <div className={style.contentWrapper}>
          <h1 className={style.title}>북마크</h1>
          <BookmarkContent />
        </div>
      </main>
    </DefaultLayout>
  );
}
