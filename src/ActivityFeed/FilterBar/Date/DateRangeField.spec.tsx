import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  ActivityFeedProvider,
  useActivityFeedStore,
} from '../../store/context';
import { withNuqsTestingAdapter } from 'nuqs/adapters/testing';
import DateRangeField from './DateRangeField';
import userEvent from '@testing-library/user-event';

function Controls() {
  const { setDateRange } = useActivityFeedStore((s) => ({
    setDateRange: s.setDateRange,
  }));
  const setToday = () => {
    const d = new Date('2025-05-25T10:00:00Z');
    setDateRange({ start: d, end: d });
  };
  return <button onClick={setToday}>setRange</button>;
}

const renderWithProvider = (
  ui: React.ReactNode,
  adapterProps?: Parameters<typeof withNuqsTestingAdapter>[0]
) =>
  render(<ActivityFeedProvider>{ui}</ActivityFeedProvider>, {
    wrapper: withNuqsTestingAdapter(adapterProps),
  });

describe('DateRangeField — URL sync', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/');
  });

  it('URL → Store on mount with from/to', () => {
    const from = '2025-05-01T00:00:00.000Z';
    const to = '2025-05-03T23:59:59.000Z';
    renderWithProvider(<DateRangeField />, {
      searchParams: `?from=${encodeURIComponent(from)}&to=${encodeURIComponent(
        to
      )}`,
    });
    // The visible text should no longer be the default "Calendar" placeholder
    expect(screen.queryByText(/calendar/i)).toBeNull();
  });

  it('Store → URL when range changes programmatically', async () => {
    const u = userEvent.setup();
    const updates: string[] = [];
    renderWithProvider(
      <>
        <DateRangeField />
        <Controls />
      </>,
      { onUrlUpdate: (e) => updates.push(e.queryString) }
    );
    await u.click(screen.getByText('setRange'));
    const last = updates.at(-1) ?? '';
    expect(last).toMatch(/from=/);
    expect(last).toMatch(/to=/);
  });
});
