import { Bookmarks } from '@/types/bookmarks';
import { Manage } from '@/types/manage';
import { Meetings } from '@/types/meetings';

// 게시물 목록 조회 결과 타입
export interface MeetingsListRes {
  ok: 1;
  item: Meetings[];
}

export interface ManageListRes {
  ok: 1;
  item: Manage[];
}

export interface Answers {
  extra: {
    answer1: string;
    answer2: string;
  };
}

// 게시물 상세 조회 결과 타입
export interface MeetingsInfoRes {
  ok: 1;
  item: Meetings;
}
import { User } from '@/types/user';

// 회원 정보 타입
export interface UserInfoRes {
  ok: 1;
  item: User;
}
export interface BookmarksInfoRes {
  ok: 1;
  item: Bookmarks;
}

// 서버 검증 에러 타입
export interface ServerValidationError {
  type: string;
  value: string;
  msg: string;
  location: string;
}

// 북마크 목록 조회 결과 타입
export interface BookmarksRes {
  ok: 1;
  item: {
    byUser: Meetings[];
    user: Meetings[];
    product: Meetings[];
    post: Meetings[];
  };
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
