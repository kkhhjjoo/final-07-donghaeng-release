import { Meetings } from '@/types/meetings';
import { create, StateCreator } from 'zustand';

// 모임 정보를 관리하는 스토어의 상태 인터페이스
interface MeetingStoreState {
  meetings: Meetings[]; // 모임 목록
  selectedMeeting: Meetings | null; // 선택된 모임 상세
  loading: boolean;

  setMeetings: (meetings: Meetings[]) => void;
  setSelectedMeeting: (meeting: Meetings | null) => void;
  setLoading: (loading: boolean) => void;
  resetMeeting: () => void;
}

// 모임 정보를 관리하는 스토어 생성
const MeetingStore: StateCreator<MeetingStoreState> = (set) => ({
  meetings: [],
  selectedMeeting: null,
  loading: false,

  setMeetings: (meetings) => set({ meetings }),
  setSelectedMeeting: (meeting) => set({ selectedMeeting: meeting }),
  setLoading: (loading) => set({ loading }),
  resetMeeting: () => set({ selectedMeeting: null, meetings: [] }),
});

const useMeetingStore = create<MeetingStoreState>()(MeetingStore);

export default useMeetingStore;
