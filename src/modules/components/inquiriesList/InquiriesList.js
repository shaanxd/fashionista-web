import React from 'react';

import styles from './InquiriesList.module.css';
import AppButton from '../appButton/AppButton';

const InquiriesList = (props) => {
  const {
    inquiries: { total, current, inquiries },
    onViewClick,
    onPaginationClick,
    visible,
    loading,
    error,
    onAddClick,
  } = props;
  return (
    <div className={styles.main__div}>
      <AppButton text="Post an Inquiry" onClick={onViewClick} />
    </div>
  );
};

export default InquiriesList;
