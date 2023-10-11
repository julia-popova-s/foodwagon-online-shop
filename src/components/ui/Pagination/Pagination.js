import ReactPaginate from 'react-paginate'

import style from './pagination.module.scss'

export function Pagination({ currentPage, onChangePage, pageCount }) {
  return (
    <ReactPaginate
      breakLabel="..."
      className={style.root}
      forcePage={currentPage - 1}
      nextLabel=">"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageCount={pageCount}
      pageRangeDisplayed={4}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  )
}
