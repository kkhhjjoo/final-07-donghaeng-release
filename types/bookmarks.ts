import { Meetings } from './meetings';

export interface Bookmarks {
  type: string;
  user_id: number;
  target_id: number;
  product: Meetings;
  _id: number;
  createdAt: string;
}
