import React from 'react';
import Select from 'react-select';

import styles from './TagList.module.css';

const TagList = props => {
  const { items, header, value, onTagSelect, loading } = props;

  const handleOnChange = option => {
    onTagSelect(option);
  };

  const getTags = () => {
    return items.map(({ id, name }) => ({ value: id, label: name }));
  };

  return (
    <div className={styles.list__div}>
      <span className={styles.list__title}>{header}</span>
      <Select
        isClearable
        options={getTags()}
        value={value}
        isDisabled={loading}
        onChange={handleOnChange}
        placeholder={`Select ${header}`}
      />
    </div>
  );
};

export default TagList;
