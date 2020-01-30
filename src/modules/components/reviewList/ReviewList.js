import React from 'react';

import styles from './ReviewList.module.css';
import AppButton from '../appButton/AppButton';

const ReviewList = props => {
  const handleOnWrite = () => {};
  return (
    <div className={styles.main__div}>
      <AppButton text="Write a review" onClick={handleOnWrite} />
    </div>
  );
};

export default ReviewList;
