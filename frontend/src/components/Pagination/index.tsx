import React from 'react';
import ReactPaginate from 'react-paginate';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import styles from './Pagination.module.sass';

interface PaginationProps {
  pageCount: number;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount }) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={3}
      marginPagesDisplayed={3}
      containerClassName={styles.paginationContainer}
      pageClassName={styles.page}
      activeClassName={styles.active}
      disabledClassName={styles.disabled}
      breakLabel="..."
      breakClassName={styles.break}
      previousLabel={<MdKeyboardArrowLeft />}
      previousClassName={styles.previous}
      previousLinkClassName={styles.previousLink}
      nextLabel={<MdKeyboardArrowRight />}
      nextClassName={styles.next}
      nextLinkClassName={styles.nextLink}
    />
  );
};

export default Pagination;
