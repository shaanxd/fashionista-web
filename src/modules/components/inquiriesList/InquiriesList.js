import React from 'react';
import Moment from 'moment';

import { AddInquiry, AppButton, Pagination } from '../';

import styles from './InquiriesList.module.css';
import PageHeader from '../pageheader/PageHeader';

const InquiriesList = props => {
  const {
    product,
    onViewClick,
    onPaginationClick,
    visible,
    loading,
    error,
    onAddClick
  } = props;

  const {
    inquiries: { inquiries, current, total }
  } = product;

  const hasInquiries = inquiries.length !== 0;

  const renderReplyList = replies => {
    return replies
      ? replies.map(({ owner: { fullName }, date, reply }, index) => {
          const last = index === replies.length - 1;
          const style = last ? styles.reply__item__last : styles.reply__item;

          return (
            <div className={style}>
              <div className={styles.header__container}>
                <div className={styles.image__container}>
                  <span>{fullName.charAt(0)}</span>
                </div>
                <div className={styles.profile__header}>
                  <span className={styles.user__name}>{fullName}</span>
                  <span className={styles.posted__date}>
                    {Moment(date).fromNow()}
                  </span>
                </div>
              </div>
              <div className={styles.details__container}>
                <span className={styles.description}>{reply}</span>
              </div>
            </div>
          );
        })
      : null;
  };

  const renderInquiriesList = () => {
    return (
      <div className={styles.list__div}>
        {inquiries.map(
          ({
            title,
            description,
            owner: { id, fullName },
            inquiryDate,
            replies
          }) => {
            console.log(replies);
            return (
              <div className={styles.list__item}>
                <div className={styles.header__container}>
                  <div className={styles.image__container}>
                    <span>{fullName.charAt(0)}</span>
                  </div>
                  <div className={styles.profile__header}>
                    <span className={styles.user__name}>{fullName}</span>
                    <span className={styles.posted__date}>
                      {Moment(inquiryDate).fromNow()}
                    </span>
                  </div>
                </div>
                <div className={styles.details__container}>
                  <span className={styles.title}>{title}</span>
                  <span className={styles.description}>{description}</span>
                </div>
                {replies.length > 0 && (
                  <div className={styles.replies__list}>
                    <span className={styles.reply__title}>Replies</span>
                    {renderReplyList(replies)}
                  </div>
                )}
              </div>
            );
          }
        )}
        <Pagination
          current={current}
          total={total}
          onPaginationClick={onPaginationClick}
          loading={loading}
        />
      </div>
    );
  };

  const renderEmptyDiv = () => {
    return (
      <div className={styles.empty__div}>
        <span>No Inquiries Yet! Be the first one to!</span>
      </div>
    );
  };

  return (
    <div className={styles.main__div}>
      <PageHeader text="Product Inquiries" />
      {hasInquiries ? renderInquiriesList() : renderEmptyDiv()}
      <AppButton text="Post an Inquiry" onClick={onViewClick} />
      {visible && (
        <AddInquiry
          drawerClickHandler={onViewClick}
          product={product}
          loading={loading}
          onAddClick={onAddClick}
          error={error}
        />
      )}
    </div>
  );
};

export default InquiriesList;
