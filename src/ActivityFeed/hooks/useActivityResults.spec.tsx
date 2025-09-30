import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActivityFeedProvider } from '../store/context';
import { useActivityResults } from './useActivityResults';
import { useActivityFeedStore } from '../store/context';

function Probe() {
  const { page, setPage } = useActivityResults();
  const { setStatuses } = useActivityFeedStore((s) => ({
    setStatuses: s.setStatuses,
  }));
  return (
    <div>
      <div data-testid='page'>{page}</div>
      <button onClick={() => setPage(3)}>jump</button>
      <button onClick={() => setStatuses(['FAILED'])}>filterFailed</button>
    </div>
  );
}

describe('useActivityResults – page clamp', () => {
  it('clamps page to last valid when results shrink', async () => {
    const u = userEvent.setup();
    render(
      <ActivityFeedProvider>
        <Probe />
      </ActivityFeedProvider>
    );

    // Jump to page 3 (zero-based). With our sample data, this is beyond range for FAILED-only.
    // Jump beyond available pages → immediate clamp to last valid (with full dataset, that's page 1)
    await u.click(screen.getByText('jump'));
    expect(screen.getByTestId('page').textContent).toBe('1');

    // Apply a shrinking filter → hook should clamp page back to a valid value (likely 0).
    await u.click(screen.getByText('filterFailed'));

    // After shrinking results, last page becomes 0; clamp should move page to 0.
    expect(screen.getByTestId('page').textContent).toBe('0');
  });
});
