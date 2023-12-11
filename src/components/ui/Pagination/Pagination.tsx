import { FC } from 'react';
import ReactPaginate from 'react-paginate';

import style from './pagination.module.scss';

type PaginationProps = { currentPage: number; handleChangePage: (pageNumber: number) => void; pageCount: number };

export const Pagination: FC<PaginationProps> = ({ currentPage, handleChangePage, pageCount }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      className={style.root}
      forcePage={currentPage - 1}
      nextLabel=">"
      onPageChange={(e) => handleChangePage(e.selected + 1)}
      pageCount={pageCount}
      pageRangeDisplayed={4}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};
