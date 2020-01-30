import React from 'react';
import { IoIosClose } from 'react-icons/io';
import { Rate } from 'antd';

import { getImageUrl } from '../../utils/productUtils';

import styles from './AddReview.module.css';

const AddReview = props => {
  const { product, user } = props;

  return (
    <div className={styles.outer__div}>
      <div
        className={styles.backdrop__div}
        onClick={props.drawerClickHandler}
      />
      <div className={styles.inner__div}>
        <div className={styles.content__header}>
          <button
            className={styles.close__button}
            onClick={props.drawerClickHandler}
          >
            <IoIosClose color="gray" size={25} />
            <span className={styles.close__text}>CLOSE</span>
          </button>
        </div>
        <span className={styles.header__text}>Write a Review</span>
        <div className={styles.form__container}>
          <div className={styles.product__container}>
            <div className={styles.thumbnail__div}>
              <img
                src={getImageUrl(product.thumbnail)}
                className={styles.product__thumbnail}
                alt="thumbnail"
              />
            </div>
            <div className={styles.detail__div}>
              <span className={styles.product__name}>{product.name}</span>
              <div className={styles.form__div}>
                <span className={styles.input__label}>Overall rating</span>
                <Rate
                  defaultValue={0.0}
                  allowHalf
                  style={{ color: 'black' }}
                  onChange={value => {
                    console.log(value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
