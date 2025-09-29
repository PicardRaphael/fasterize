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
  return useStoreWithEqualityFn(store, selector, equalityFn);
}

export { shallow };
