import React from 'react';

import styles from './Pagination.module.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Pagination = props => {
  const { current, total, loading } = props;

  return (
    <div className={styles.main__div}>
      <button
        className={styles.arrow__button}
        disabled={loading || current === 0}
      >
        <IoIosArrowBack size={20} />
      </button>
      <span className={styles.page__number}>{`${current} / ${total}`}</span>
      <button
        className={styles.arrow__button}
        disabled={loading || current === total}
      >
        <IoIosArrowForward size={20} />
      </button>
    </div>
  );
};

export default Pagination;
