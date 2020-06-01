import React from 'react';
import Moment from 'moment';

import { AddInquiry, AppButton, Pagination } from '../';

import styles from './InquiriesList.module.css';
import PageHeader from '../pageheader/PageHeader';

const InquiriesList = (props) => {
  const { product, onViewClick, onPaginationClick, visible, loading, error, onAddClick } = props;

  const {
    inquiries: { inquiries, current, total },
  } = product;

  const hasInquiries = inquiries.length !== 0;

  const renderInquiriesList = () => {
    return (
      <div className={styles.list__div}>
        {inquiries.map(({ title, description, owner: { id, fullName, inquiryDate } }) => {
          return (
            <div className={styles.list__item}>
              <div className={styles.header__container}>
                <div className={styles.image__container}>
                  <span>{fullName.charAt(0)}</span>
                </div>
                <div className={styles.profile__header}>
                  <span className={styles.user__name}>{fullName}</span>
                  <span className={styles.posted__date}>{Moment(inquiryDate).fromNow()}</span>
                </div>
              </div>
              <div className={styles.details__container}>
                <span className={styles.title}>{title}</span>
                <span className={styles.description}>{description}</span>
              </div>
            </div>
          );
        })}
        <Pagination current={current} total={total} onPaginationClick={onPaginationClick} loading={loading} />
      </div>
    );
  };

  const renderEmptyDiv = () => {
    return <div className={styles.empty__div}></div>;
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
