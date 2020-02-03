import React from 'react';
import { Rate } from 'antd';
import Moment from 'moment';

import styles from './ReviewItem.module.css';

const ReviewItem = props => {
  const {
    review: {
      title,
      description,
      rating,
      reviewDate,
      owner: { fullName }
    }
  } = props;

  return (
    <div className={styles.details__div}>
      <div className={styles.header__container}>
        <div className={styles.profile__header}>
          <span className={styles.user__name}>{fullName}</span>
          <span className={styles.posted__date}>
            {Moment(reviewDate).fromNow()}
          </span>
        </div>
        <div className={styles.rating__header}>
          <Rate
            value={rating}
            style={{ color: 'black', fontSize: '10px' }}
            disabled={true}
          />
          <span className={styles.rating__text}>{`${rating} of 5`}</span>
        </div>
      </div>
      <span className={styles.title__text}>{title}</span>
      <div className={styles.description__text}>{description}</div>
    </div>
  );
};

export default ReviewItem;
