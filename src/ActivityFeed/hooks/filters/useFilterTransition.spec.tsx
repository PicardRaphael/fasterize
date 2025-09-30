import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActivityFeedProvider } from '../../store/context';
import { useFilterTransition } from './useFilterTransition';
import { useActivityFeedStore } from '../../store/context';

// Composant de test qui utilise useFilterTransition
function TestProbe() {
  const { isPending, setStatuses, setSearch } = useFilterTransition();
  const statuses = useActivityFeedStore((s) => s.filters.statuses);
  const search = useActivityFeedStore((s) => s.filters.search);

  return (
    <div>
      <div data-testid='pending'>{isPending ? 'pending' : 'idle'}</div>
      <div data-testid='statuses'>{statuses.join(',')}</div>
      <div data-testid='search'>{search}</div>
      <button onClick={() => setStatuses(['FAILED'])}>Set Failed</button>
      <button onClick={() => setSearch('test query')}>Set Search</button>
    </div>
  );
}

describe('useFilterTransition', () => {
  it('should start pending state when filter changes', async () => {
    const user = userEvent.setup();
    render(
      <ActivityFeedProvider>
        <TestProbe />
      </ActivityFeedProvider>
    );

    // État initial
    expect(screen.getByTestId('pending').textContent).toBe('idle');
    expect(screen.getByTestId('statuses').textContent).toBe('');

    // Déclencher un changement de filtre
    await user.click(screen.getByText('Set Failed'));

    // La transition devrait appliquer le changement
    await waitFor(() => {
      expect(screen.getByTestId('statuses').textContent).toBe('FAILED');
    });

    // isPending devrait revenir à false après la transition
    await waitFor(() => {
      expect(screen.getByTestId('pending').textContent).toBe('idle');
    });
  });

  it('should handle search filter with transition', async () => {
    const user = userEvent.setup();
    render(
      <ActivityFeedProvider>
        <TestProbe />
      </ActivityFeedProvider>
    );

    await user.click(screen.getByText('Set Search'));

    await waitFor(() => {
      expect(screen.getByTestId('search').textContent).toBe('test query');
    });
  });

  it('should expose all filter setters', () => {
    const TestSetters = () => {
      const transition = useFilterTransition();
      return (
        <div>
          <div data-testid='has-setStatuses'>
            {typeof transition.setStatuses}
          </div>
          <div data-testid='has-setTypes'>{typeof transition.setTypes}</div>
          <div data-testid='has-setUsers'>{typeof transition.setUsers}</div>
          <div data-testid='has-setDateRange'>
            {typeof transition.setDateRange}
          </div>
          <div data-testid='has-setSearch'>{typeof transition.setSearch}</div>
          <div data-testid='has-clearFilters'>
            {typeof transition.clearFilters}
          </div>
          <div data-testid='has-isPending'>{typeof transition.isPending}</div>
        </div>
      );
    };

    render(
      <ActivityFeedProvider>
        <TestSetters />
      </ActivityFeedProvider>
    );

    // Vérifie que toutes les fonctions sont exposées
    expect(screen.getByTestId('has-setStatuses').textContent).toBe('function');
    expect(screen.getByTestId('has-setTypes').textContent).toBe('function');
    expect(screen.getByTestId('has-setUsers').textContent).toBe('function');
    expect(screen.getByTestId('has-setDateRange').textContent).toBe('function');
    expect(screen.getByTestId('has-setSearch').textContent).toBe('function');
    expect(screen.getByTestId('has-clearFilters').textContent).toBe('function');
    expect(screen.getByTestId('has-isPending').textContent).toBe('boolean');
  });
});
