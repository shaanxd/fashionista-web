import React from 'react';

import { AppButton, AddReview, ReviewItem, Pagination } from '..';

import styles from './ReviewList.module.css';

const ReviewList = props => {
  const {
    product,
    onAddClick,
    addLoading,
    addError,
    visible,
    onViewClick
  } = props;

  const renderReviews = () => {
    const items = product.reviews.reviews.map((item, index) => (
      <ReviewItem key={index} review={item} isLast={index === 2} />
    ));

    return items;
  };

  return (
    <div className={styles.main__div}>
      <div className={styles.review__div}>
        <div className={styles.overall__div}></div>
        <div className={styles.list__div}>
          {renderReviews()}
          <Pagination
            current={product.reviews.current}
            total={product.reviews.total}
          />
        </div>
      </div>
      <AppButton text="Write a review" onClick={onViewClick} />
      {visible && (
        <AddReview
          drawerClickHandler={onViewClick}
          product={product}
          loading={addLoading}
          onAddClick={onAddClick}
          error={addError}
        />
      )}
    </div>
  );
};

export default ReviewList;
