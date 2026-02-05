'use client';

import { useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import useChat from '@/hooks/useChat';
import useUserStore from '@/zustand/userStore';
import ChatRoomList from '@/app/chat/ChatRoomList';
import { ChatRoomState } from '@/types/chat';
import ChatRoom from '@/app/chat/ChatRoom';
import styles from './ChatMain.module.css';

interface ChatMainProps {
  meetingId?: string; // 특정 게시물 페이지에서 채팅하기 버튼을 눌러 들어온 경우 게시물 ID
  userId?: string; // 특정 유저 프로필에서 채팅하기 버튼을 눌러 들어온 경우 유저 ID
}

export default function ChatMain({ meetingId, userId }: ChatMainProps) {
  const {
    rooms, // 채팅방 목록
    activeRoomId, // 현재 활성화된 방의 ID
    leaveRoom, // 채팅방 나가기
    enterRoom, // 채팅방 입장
  } = useChat();

  const { user: currentUser, hasHydrated } = useUserStore();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 하이드레이션이 끝나지 않았으면 아무것도 하지 않음
    if (!hasHydrated) return;
    if (!currentUser) {
      const redirectUrl = encodeURIComponent(pathname + (searchParams.toString() ? '?' + searchParams.toString() : ''));
      router.replace(`/login?redirect=${redirectUrl}`);
    }
  }, [currentUser, hasHydrated, router, pathname, searchParams]);

  // 초기 데이터 로드 및 가상 파트너 정보 가져오기
  useEffect(() => {
    if (!currentUser?._id) return;

    const init = async () => {
      // 전달받은 정보를 기반으로 해당 채팅방 입장
      // meetingId: 게시글 ID(게시글에 대한 작성자와의 채팅), userId: 사용자 ID(사용자와의 일반 채팅)
      if (meetingId) {
        await enterRoom({ resourceType: 'product', resourceId: Number(meetingId) });
      } else if (userId) {
        await enterRoom({ resourceType: 'user', resourceId: Number(userId) });
      }
    };

    init();
  }, [currentUser, meetingId, userId, enterRoom]);

  if (!currentUser) {
    return (
      <div className={styles.loadingContainer}>
        <h3 className={styles.loadingText}>잠시만 기다려 주세요...</h3>
      </div>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.mainContent}>
        {/* 채팅방 목록 */}
        <ChatRoomList
          rooms={rooms as ChatRoomState[]}
          activeRoomId={activeRoomId}
          onSelectRoom={(id) => {
            enterRoom({ resourceType: 'room', resourceId: Number(id) });
            // 선택 시 URL 파라미터 초기화
            router.replace(pathname);
          }}
          onLeaveRoom={(id) => {
            leaveRoom(Number(id));
          }}
        />

        {/* 채팅방 상세보기 영역 */}
        <ChatRoom />
      </div>
    </main>
  );
}
