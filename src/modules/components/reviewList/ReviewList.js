import React from 'react';

import { AppButton, AddReview } from '..';
import { useMergedState } from '../../utils/useMergedState';

import styles from './ReviewList.module.css';

const ReviewList = props => {
  const [state, setState] = useMergedState({
    visible: true
  });

  const { product, user } = props;

  const handleOnWrite = () => {
    setState(prevState => ({ ...prevState, visible: !prevState.visible }));
  };

  return (
    <div className={styles.main__div}>
      <AppButton text="Write a review" onClick={handleOnWrite} />
      {state.visible && (
        <AddReview
          drawerClickHandler={handleOnWrite}
          product={product}
          user={user}
        />
      )}
    </div>
  );
};

export default ReviewList;
