// 모임 상세
export interface Meetings {
  seller_id: number;
  _id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  content: string;
  quantity: number;
  buyQuantity: number;
  image?: { path: string };
  // ㄴ> 내가 지원한 모임에서 받아오는 데이터의 이미지
  mainImages: [{ path: string; name: string }];
  // ㄴ> 모임장이 등록한 이미지
  extra: {
    category: string;
    gender: string;
    age: number;
    date: string;
    region: string;
    survey1: string;
    survey2: string;
  };
  seller: {
    _id: number;
    name: string;
  };
}
