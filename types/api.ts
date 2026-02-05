import { Apply } from '@/types/apply';
import { Bookmarks } from '@/types/bookmarks';
import { ChatRoom } from '@/types/chat';
import { Manage } from '@/types/manage';
import { Meetings } from '@/types/meetings';
import { User } from '@/types/user';
import { Notification } from '@/types/notification';

// 게시물 목록 조회 응답 타입
export interface MeetingsListRes {
  ok: 1;
  item: Meetings[];
}
// 게시물 상세 조회 응답 타입
export interface MeetingsInfoRes {
  ok: 1;
  item: Meetings;
}

// 신청한 리스트 관리 응답 타입
export interface ManageListRes {
  ok: 1;
  item: Manage[];
}

// 회원 정보 응답 타입
export interface UserInfoRes {
  ok: 1;
  item: User;
}

// 사용자가 지원했던(참여했던) 모임 리스트 응답타입
export interface ApplyListRes {
  ok: 1;
  item: Apply[];
}

// 북마크 한개의 응답타입
export interface BookmarksInfoRes {
  ok: 1;
  item: Bookmarks;
}

// 북마크 리스트의 응답타입
export interface BookmarksResponse {
  ok: number;
  item: Bookmarks[];
}

export interface ChatRoomListRes {
  ok: 1;
  item: ChatRoom[];
}

export interface ChatRoomInfoRes {
  ok: 1;
  item: ChatRoom;
}

// 서버 검증 에러 타입
export interface ServerValidationError {
  type: string;
  value: string;
  msg: string;
  location: string;
}

// 에러 타입
export interface ErrorRes {
  ok: 0;
  message: string;
  errors?: {
    [fieldName: string]: ServerValidationError;
  };
}

// 파일 업로드 결과 타입
export interface FileUploadRes {
  ok: 1;
  item: {
    name: string;
    path: string;
  }[];
}

// 알림 목록 조회 응답 타입
export interface NotificationListRes {
  ok: 1;
  item: Notification[];
}
