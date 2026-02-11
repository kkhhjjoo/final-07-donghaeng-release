'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import styles from './Main.module.css';

const AiRecommendModal = dynamic(() => import('./AiRecommendModal'));

export default function SearchAiSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      // 검색어가 있으면 검색한 키워드에 관한 모임페이지로 이동
      router.push(`/meetings?keyword=${encodeURIComponent(keyword.trim())}`);
    }
  };

  return (
    <>
      <section className={styles[`search-ai-wrapper`]}>
        <form className={styles[`search-bar-wrapper`]} onSubmit={handleSearch}>
          <div className={styles[`input-image-wrapper`]}>
            <label htmlFor="search-bar" className="sr-only">
              모임 검색
            </label>
            <input className={styles[`search-bar`]} type="search" id="search-bar" placeholder="관심 있는 모임을 검색으로 찾아보세요!" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
            <button type="submit">
              <Image className={styles[`search-image`]} src="/icon/search.svg" alt="검색아이콘" width={27} height={27} />
            </button>
          </div>
        </form>
        <button type="button" className={styles[`ai-recommend`]} onClick={() => setIsModalOpen(true)}>
          <span>AI</span>
          <span>추천</span>
        </button>
      </section>
      <AiRecommendModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
