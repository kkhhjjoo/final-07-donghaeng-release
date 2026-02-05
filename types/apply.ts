import { Meetings } from '@/types/meetings';

export interface Apply {
  _id: number; //주문아이디
  user_id: number; // 상품을 주문한 사용자 아이디
  product_id: number; // 상품아이디
  quantity: number; //수량
  state: string; //주문상태 (OS010: 대기, OS040: 승인, OS310: 거절)
  products: Meetings[];
  extra: {
    answer1: string;
    answer2: string;
  };
  user: {
    name: string;
    image: string;
  };
}
