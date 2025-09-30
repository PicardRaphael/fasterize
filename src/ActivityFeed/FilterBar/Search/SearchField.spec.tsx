import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchField from './SearchField';
import { ActivityFeedProvider } from '../../store/context';
import { withNuqsTestingAdapter } from 'nuqs/adapters/testing';

const renderWithProvider = (
  ui: React.ReactNode,
  adapterProps?: Parameters<typeof withNuqsTestingAdapter>[0]
) =>
  render(<ActivityFeedProvider>{ui}</ActivityFeedProvider>, {
    wrapper: ({ children }) =>
      withNuqsTestingAdapter(adapterProps)({ children }),
  });

describe('SearchField — URL sync', () => {
  const originalLocation = window.location.href;

  beforeEach(() => {
    // Reset URL before each test
    window.history.replaceState({}, '', '/');
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    window.history.replaceState({}, '', originalLocation);
  });

  it('applies initial ?q=… from the URL to the input/store', () => {
    renderWithProvider(<SearchField />, { searchParams: '?q=cache' });
    const input = screen.getByLabelText(
      /search activities/i
    ) as HTMLInputElement;
    expect(input.value).toBe('cache');
  });

  it.skip('updates ?q=… after typing (debounced) and clears it with the clear button', async () => {
    const u = userEvent.setup();
    const updates: string[] = [];
    renderWithProvider(<SearchField />, {
      onUrlUpdate: (e) => updates.push(e.queryString),
    });
    const input = screen.getByLabelText(
      /search activities/i
    ) as HTMLInputElement;

    await u.type(input, 'dns');
    // Debounce delay + adapter rate limiting
    vi.advanceTimersByTime(1000);
    await Promise.resolve();
    expect(updates.at(-1)).toContain('q=dns');

    // Clear via the end adornment button
    await u.click(screen.getByLabelText(/clear search/i));
    vi.advanceTimersByTime(1000);
    await Promise.resolve();
    expect(updates.at(-1)).not.toContain('q=');
  });
});
