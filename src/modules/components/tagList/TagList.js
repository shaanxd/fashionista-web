import React from 'react';

import styles from './TagList.module.css';

const TagList = props => {
  const { items, header, value, onTagSelect, loading } = props;

  const handleOnChange = id => {
    onTagSelect(id);
  };

  const renderTagList = () => {
    const components = items.map(({ name, id }) => {
      const style = value === id ? [styles.radio, styles.selected].join(' ') : styles.radio;

      return (
        <button
          key={id}
          type="button"
          className={style}
          onClick={() => {
            handleOnChange(id);
          }}
          disabled={loading}
        >
          <span className={styles.tag__name}>{name}</span>
        </button>
      );
    });

    return components;
  };

  return (
    <div className={styles.list__div}>
      <span className={styles.list__title}>{header}</span>
      <div className={styles.radio__div}>{renderTagList()}</div>
    </div>
  );
};

export default TagList;
