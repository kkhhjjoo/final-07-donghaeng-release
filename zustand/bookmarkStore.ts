'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 모임 타입 정의
export interface Meeting {
  id: number;
  title: string;
  category: {
    location: string;
    theme: string;
    age: string;
    gender: string;
    people: string;
  };
  date: string;
}

interface BookmarkState {
  bookmarkedIds: number[];
  addBookmark: (id: number) => void;
  removeBookmark: (id: number) => void;
  toggleBookmark: (id: number) => void;
  isBookmarked: (id: number) => boolean;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarkedIds: [],
      addBookmark: (id) =>
        set((state) => ({
          bookmarkedIds: [...state.bookmarkedIds, id],
        })),
      removeBookmark: (id) =>
        set((state) => ({
          bookmarkedIds: state.bookmarkedIds.filter((bookmarkId) => bookmarkId !== id),
        })),
      toggleBookmark: (id) => {
        const isBookmarked = get().bookmarkedIds.includes(id);
        if (isBookmarked) {
          get().removeBookmark(id);
        } else {
          get().addBookmark(id);
        }
      },
      isBookmarked: (id) => get().bookmarkedIds.includes(id),
    }),
    {
      name: 'bookmark-storage', // localStorage key
    }
  )
);
