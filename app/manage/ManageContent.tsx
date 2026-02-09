'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import style from './ManageAllPage.module.css';
import useUserStore from '@/zustand/userStore';
import { getMyAddMeetings } from '@/lib/meetings';
import { Meetings } from '@/types/meetings';
import ManageSwiper from './ManageSwiper';

export default function ManageContent() {
  const router = useRouter();
  const { user } = useUserStore();
  const [meetings, setMeetings] = useState<Meetings[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const hasHydrated = useUserStore((state) => state.hasHydrated);
  const accessToken = user?.token?.accessToken;

  useEffect(() => {
    if (!hasHydrated) return;

    if (!accessToken) {
      router.replace('/login');
      return;
    }

    const fetchMyAddMeetings = async () => {
      const response = await getMyAddMeetings(accessToken);

      if (response.ok === 1) {
        setMeetings(response.item);
        setIsEmpty(response.item.length === 0);
      }
      setIsLoading(false);
    };

    fetchMyAddMeetings();
  }, [hasHydrated, accessToken, router]);

  if (!hasHydrated || isLoading) return null;

  if (!accessToken) return null;

  if (isEmpty) {
    return <div className={style.empty}>등록한 모임이 없습니다.</div>;
  }

  return <ManageSwiper meetings={meetings} />;
}
