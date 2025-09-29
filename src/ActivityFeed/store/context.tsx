// React Context wrapper around the vanilla Zustand store.
// Pattern: create the store once (useRef) and expose a typed selector hook
// with useStoreWithEqualityFn + shallow to minimize re-renders.
import { createContext, useContext, useRef, type ReactNode } from 'react';
import type { StoreApi } from 'zustand/vanilla';
import { useStoreWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import type { ActivityFeedState } from '../types/types';
import { createActivityFeedStore } from './store';

const ActivityFeedStoreContext = createContext<
  StoreApi<ActivityFeedState> | undefined
>(undefined);

export const ActivityFeedProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<StoreApi<ActivityFeedState> | null>(null);
  if (!storeRef.current) storeRef.current = createActivityFeedStore();
  return (
    <ActivityFeedStoreContext.Provider value={storeRef.current!}>
      {children}
    </ActivityFeedStoreContext.Provider>
  );
};

export function useActivityFeedStore<T>(
  selector: (state: ActivityFeedState) => T,
  equalityFn?: (left: T, right: T) => boolean
): T {
  const store = useContext(ActivityFeedStoreContext);
  if (!store)
    throw new Error(
      'useActivityFeedStore must be used within ActivityFeedProvider'
    );
  // Consumers should pass `shallow` when selecting multiple fields to avoid re-rendering
  // when the slice is referentially stable.
  return useStoreWithEqualityFn(store, selector, equalityFn);
}

export { shallow };
