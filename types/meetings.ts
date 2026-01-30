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
  mainImages: [{ path: string; name: string }];
  extra: {
    category: string;
    gender: string;
    age: number;
    date: string;
    region: string;
    survey1: string;
    survey2: string;
  };
}
