import React from 'react';

import styles from './TagList.module.css';

const TagList = props => {
  const {
    tags: { brands, genders, types },
    selected,
    onTagSelect
  } = props;

  const handleOnChange = value => {
    onTagSelect(value);
  };

  const renderTagList = (items, header) => {
    const components = items.map(({ name, id }) => {
      const isSelected = selected === id;
      const style = isSelected
        ? [styles.radio, styles.selected].join(' ')
        : styles.radio;

      return (
        <button
          type="button"
          className={style}
          onClick={() => {
            handleOnChange(id);
          }}
        >
          <span className={styles.tag__name}>{name}</span>
        </button>
      );
    });

    return (
      <div className={styles.list__div}>
        <span className={styles.list__title}>{header}</span>
        <div className={styles.radio__div}>{components}</div>
      </div>
    );
  };

  return (
    <div className={styles.main__div}>
      {renderTagList(genders, 'Gender')}
      {renderTagList(brands, 'Brands')}
      {renderTagList(types, 'Type')}
    </div>
  );
};

export default TagList;
