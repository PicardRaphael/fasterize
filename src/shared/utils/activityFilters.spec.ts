import { describe, it, expect } from 'vitest';
import activitiesData from '../../data/activities.json';
import type { Activity } from '../types/activity.type';
import { getActivitiesPage } from './activityFilters';

const activities = (activitiesData as unknown as Activity[])
  .slice()
  // The store sorts once by createdAt desc; reproduce here for deterministic expectations
  .sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

describe('getActivitiesPage', () => {
  it('filters by FAILED status only', () => {
    const page = getActivitiesPage(
      activities,
      { statuses: ['FAILED'], types: [], users: [], dateRange: { start: null, end: null }, search: '' },
      0,
      1000
    );
    expect(page.totalCount).toBeGreaterThan(0);
    expect(page.items.every((a) => a.status === 'FAILED')).toBe(true);
  });

  it('applies inclusive date range (start/end days included)', () => {
    // Take one known activity and filter exactly on its calendar day
    const sample = activities[0];
    const d = new Date(sample.createdAt);
    const start = new Date(d);
    const end = new Date(d);
    const { items, totalCount } = getActivitiesPage(
      activities,
      { statuses: [], types: [], users: [], dateRange: { start, end }, search: '' },
      0,
      1000
    );
    expect(totalCount).toBeGreaterThan(0);
    // The selected item must be included
    expect(items.some((a) => a.id === sample.id)).toBe(true);
  });

  it('matches simple search query across common fields', () => {
    // Try a term found in subject/description/supportTicket/type/user name; using a broad term to be resilient
    const term = 'dns';
    const { items, totalCount } = getActivitiesPage(
      activities,
      { statuses: [], types: [], users: [], dateRange: { start: null, end: null }, search: term },
      0,
      1000
    );
    expect(totalCount).toBeGreaterThan(0);
    const matches = (a: Activity) => {
      const q = term.toLowerCase();
      const hay = [a.subject, a.description, a.supportTicket, a.requestId, a.applicationId, a.type, a.user?.name];
      return hay.some((v) => typeof v === 'string' && v.toLowerCase().includes(q));
    };
    expect(items.every(matches)).toBe(true);
  });

  it('returns correct pagination slice and totalCount', () => {
    const pageSize = 5;
    const pageIndex = 1; // second page (zero-based)
    const { items, totalCount } = getActivitiesPage(
      activities,
      { statuses: [], types: [], users: [], dateRange: { start: null, end: null }, search: '' },
      pageIndex,
      pageSize
    );
    expect(totalCount).toBe(activities.length);
    const expectedIds = activities.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize).map((a) => a.id);
    expect(items.map((a) => a.id)).toEqual(expectedIds);
  });
});

