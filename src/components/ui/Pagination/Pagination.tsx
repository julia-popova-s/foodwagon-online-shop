import { FC } from 'react';
import ReactPaginate from 'react-paginate';

import style from './pagination.module.scss';

type PaginationProps = { currentPage: number; handlePageChange: (pageNumber: number) => void; pageCount: number };

export const Pagination: FC<PaginationProps> = ({ currentPage, handlePageChange, pageCount }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      className={style.root}
      forcePage={currentPage - 1}
      nextLabel=">"
      onPageChange={(e) => handlePageChange(e.selected + 1)}
      pageCount={pageCount}
      pageRangeDisplayed={4}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};
