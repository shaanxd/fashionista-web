import React from 'react';

import styles from './Pagination.module.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Pagination = props => {
  const { current, total, loading } = props;

  const onNextClick = () => {
    props.onPaginationClick(current + 1);
  };

  const onPreviousClick = () => {
    props.onPaginationClick(current - 1);
  };

  return (
    <div className={styles.main__div}>
      <button
        className={styles.arrow__button}
        disabled={loading || current === 0}
        onClick={onPreviousClick}
      >
        <IoIosArrowBack size={20} />
      </button>
      <span className={styles.page__number}>{`${current} / ${total}`}</span>
      <button
        className={styles.arrow__button}
        disabled={loading || current === total}
        onClick={onNextClick}
      >
        <IoIosArrowForward size={20} />
      </button>
    </div>
  );
};

export default Pagination;
