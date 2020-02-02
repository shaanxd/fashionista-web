import React from 'react';
import { Rate, Progress } from 'antd';

import { AppButton, AddReview, ReviewItem, Pagination } from '..';

import styles from './ReviewList.module.css';

const ReviewList = props => {
  const {
    product,
    onAddClick,
    addLoading,
    addError,
    visible,
    onViewClick,
    onPaginationClick
  } = props;

  const hasReviews = product.reviews.reviews.length !== 0;

  const renderReviews = () => {
    const items = product.reviews.reviews.map((item, index) => (
      <ReviewItem
        key={index}
        review={item}
        isLast={index === product.reviews.reviews.length - 1}
      />
    ));

    return items;
  };

  const renderProgress = () => {
    return (
      <div className={styles.progress__div}>
        <div className={styles.progress__group}>
          <span className={styles.progress__text}>1 star</span>
          <div className={styles.progress__container}>
            <Progress
              percent={(product.oneStars / product.totalStars) * 100}
              showInfo={false}
              size="small"
              strokeColor="black"
            />
          </div>
        </div>
        <div className={styles.progress__group}>
          <span className={styles.progress__text}>2 star</span>
          <div className={styles.progress__container}>
            <Progress
              percent={(product.twoStars / product.totalStars) * 100}
              showInfo={false}
              size="small"
              strokeColor="black"
            />
          </div>
        </div>
        <div className={styles.progress__group}>
          <span className={styles.progress__text}>3 star</span>
          <div className={styles.progress__container}>
            <Progress
              percent={(product.threeStars / product.totalStars) * 100}
              showInfo={false}
              size="small"
              strokeColor="black"
            />
          </div>
        </div>
        <div className={styles.progress__group}>
          <span className={styles.progress__text}>4 star</span>
          <div className={styles.progress__container}>
            <Progress
              percent={(product.fourStars / product.totalStars) * 100}
              showInfo={false}
              size="small"
              strokeColor="black"
            />
          </div>
        </div>
        <div className={styles.progress__group}>
          <span className={styles.progress__text}>5 star</span>
          <div className={styles.progress__container}>
            <Progress
              percent={(product.fiveStars / product.totalStars) * 100}
              showInfo={false}
              size="small"
              strokeColor="black"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.main__div}>
      <div className={styles.review__div}>
        <div className={styles.overall__div}>
          <div className={styles.summary__div}>
            <div className={styles.rating__big}>
              <span className={styles.rating__actual}>{product.avgRating}</span>
              <span className={styles.rating__total}> / 5.0</span>
            </div>
            <div className={styles.rating__small}>
              <Rate
                defaultValue={product.avgRating}
                style={{ color: 'black', fontSize: '15px', marginTop: '-4px' }}
                disabled
              />
              <span className={styles.review__count}>
                {hasReviews ? `${product.totalStars} reviews` : `No reviews`}
              </span>
            </div>
          </div>
          {hasReviews && renderProgress()}
        </div>
        {hasReviews && (
          <div className={styles.list__div}>
            {renderReviews()}
            <Pagination
              current={product.reviews.current}
              total={product.reviews.total}
              onPaginationClick={onPaginationClick}
            />
          </div>
        )}
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
