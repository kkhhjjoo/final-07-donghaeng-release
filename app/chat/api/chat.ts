import { apiCall } from '@/app/chat/api/api';
import { ChatRoomInfoRes, ChatRoomListRes } from '@/types/api';

/**
 * 내 채팅방 목록 조회
 */
export async function getMyRooms(accessToken: string) {
  return apiCall<ChatRoomListRes>(`/chats`, { accessToken });
}

/**
 * 채팅방 상세 조회(없을 경우 생성)
 */
export async function getRoomInfo({ accessToken, resourceType, resourceId }: { accessToken: string; resourceType: string; resourceId: number }) {
  return apiCall<ChatRoomInfoRes>(`/chats/${resourceType}/${resourceId}`, { accessToken });
}
