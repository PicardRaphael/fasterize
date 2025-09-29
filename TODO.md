# Mandatory Test TODOs (Lean Suite)

This is a focused list of high‑value tests to guard core behavior with minimal coverage. Use Vitest + Testing Library. Co‑locate specs beside the code when possible.

- Core filtering + pagination window
  - File: `src/shared/utils/activityFilters.spec.ts`
  - Covers:
    - Inclusive date range: items on exact start and end days are included.
    - Status filter: selecting `FAILED` returns only failed activities.
    - Search query: matches `subject | description | supportTicket | requestId | applicationId | type | user.name` (simple case).
    - Pagination slice: returns correct `items` window and `totalCount` is the filtered total.
  - Fixture: `src/data/activities.json` (import and assert by known ids/counts).

- Page clamp (no empty pages after filtering)
  - File: `src/ActivityFeed/hooks/useActivityResults.spec.tsx`
  - Covers:
    - Start on a higher page (e.g., page=3 at 15/pg), apply a filter that shrinks results to < 15.
    - Expect `setPage` called with the last valid page (clamped) and rendered list not empty.
  - Harness: render `ActivityFeedProvider`, seed store via selectors, then trigger filter updates.

- Date URL sync (representative of all filters)
  - File: `src/ActivityFeed/FilterBar/Date/DateRangeField.spec.tsx`
  - Covers:
    - URL → Store: initialize with `?from=YYYY-MM-DD&to=YYYY-MM-DD`, expect store `dateRange` set and label text reflects range.
    - Store → URL: change the range via picker, expect query params to update (guard prevents loops).
  - Tips: use JSDOM `window.history.pushState` and assert `location.search`.

- Search field behavior (debounce + URL + chip)
  - File: `src/ActivityFeed/FilterBar/Search/SearchField.spec.tsx`
  - Covers:
    - Typing updates store and `?q=` after 250 ms (use fake timers).
    - Clearing via the clear button resets store and removes `q` from URL.
    - Chip “Search: …” appears when non‑empty and is deletable (optional simple assertion via `ActiveFiltersChips`).

- Empty state vs. list rendering (smoke)
  - File: `src/ActivityFeed/ActivityList/ActivityListContainer.spec.tsx`
  - Covers:
    - With filters that yield 0 results, render the empty state message.
    - With default filters, render at least 1 `ActivityItem` and the found count matches `totalCount`.

Notes
- Keep tests data‑driven; prefer asserting counts/ids from `activities.json` over brittle UI snapshots.
- Use `vi.useFakeTimers()` to advance the 250 ms debounce in search tests.
- Avoid testing MUI internals; focus on public text/aria/URL and store behavior.
- Do not synchronize pagination to the URL in tests (by design). Clamp behavior is asserted in the hook test.

Running
```bash
npm run test -- --coverage
```
