'use client';

import ReactPaginateImport from 'react-paginate';
import css from './Pagination.module.css';

const ReactPaginate =
  (ReactPaginateImport as unknown as { default?: typeof ReactPaginateImport })
    .default ?? ReactPaginateImport;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={currentPage - 1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      containerClassName={css.pagination}
      activeClassName={css.active}
      previousLabel="←"
      nextLabel="→"
      renderOnZeroPageCount={null}
    />
  );
}
