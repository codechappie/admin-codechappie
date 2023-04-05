import { Pagination } from "react-headless-pagination";

import React from "react";
import styles from "./Pagination.module.scss";
interface Props {
  totalPages: number;
  handlePageChange: any;
  page: number;
}
const MyPagination = ({ totalPages, handlePageChange, page }: Props) => {
  return (
    <>
      <Pagination
        currentPage={page}
        setCurrentPage={handlePageChange}
        totalPages={totalPages}
        edgePageCount={1}
        middlePagesSiblingCount={1}
        className={styles.chappie__pagination}
        truncableText="..."
        truncableClassName=""
      >
        <Pagination.PrevButton className={styles.prev}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width={20}
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
            />
          </svg>
        </Pagination.PrevButton>

        <ul className={styles.main__pagination}>
          <Pagination.PageButton
            activeClassName={styles.active}
            inactiveClassName={styles.inactive}
            className=""
          />
        </ul>

        <Pagination.NextButton className={styles.next}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width={20}
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
            />
          </svg>
        </Pagination.NextButton>
      </Pagination>
    </>
  );
};

export default MyPagination;
