import TablePagination from '@mui/material/TablePagination';
import { useActivityResults } from '../hooks/useActivityResults';

export default function PaginationBar() {
  const { setPage, totalCount, page, perPage, setPerPage } =
    useActivityResults();

  return (
    <div className='flex w-full items-center justify-end gap-2'>
      <TablePagination
        component='div'
        count={totalCount}
        page={page}
        onPageChange={(_e, p) => setPage(p)}
        rowsPerPage={perPage}
        onRowsPerPageChange={(e) => setPerPage(parseInt(e.target.value, 10))}
        rowsPerPageOptions={[15, 25, 50, 100]}
        labelRowsPerPage='Items per page:'
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} of ${count}`
        }
        getItemAriaLabel={(type) => {
          switch (type) {
            case 'first':
              return 'First page';
            case 'previous':
              return 'Previous page';
            case 'next':
              return 'Next page';
            case 'last':
              return 'Last page';
            default:
              return 'Pagination';
          }
        }}
      />
    </div>
  );
}
