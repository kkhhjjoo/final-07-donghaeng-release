import { User } from '@/types/user';

export interface Notification {
  _id: string;
  target_id: number; // 대상 id
  content: string; // 알림 메세지
  type?: string; // 알림 종류 구분
  channel?: string; // 알림 전달 방법
  extra?: {
    meetingId: string; // 모임 id
    meetingTitle: string; // 모임 제목
    mainImages: string; // 모임 이미지
  };
  user: User;
  isRead: boolean; // 읽음 여부
  createdAt: string; // 생성일
  updatedAt: string; // 수정일
}

export interface NewNotification {
  newNoti: Notification;
  list: Notification[];
}
