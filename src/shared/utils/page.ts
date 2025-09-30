export const paginateItems = <T>(
  items: T[],
  pageIndex: number,
  pageSize: number
): T[] => {
  const start = Math.max(0, pageIndex) * Math.max(1, pageSize);
  return items.slice(start, start + pageSize);
};
