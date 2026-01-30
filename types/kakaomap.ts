import { Meetings } from '@/types/meetings';

// 카카오맵 타입 선언
export interface KakaoMapProps {
  width?: string;
  height?: string;
  lat?: number;
  lng?: number;
  className?: string;
  meetings?: Meetings[];
  selectedId?: number | null;
}
