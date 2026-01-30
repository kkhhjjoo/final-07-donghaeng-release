import { Meetings } from '@/types/meetings';

export interface Manage {
  _id: number; //주문아이디
  user_id: number; // 상품을 주문한 사용자 아이디
  product_id: number; // 상품아이디
  quantity: number; //수량
  products: Meetings[]; // 안에있는거는 판매자아이디
  extra: {
    answer1: string;
    answer2: string;
  };
  user: {
    name: string;
    image: string;
  };
}
