import React from 'react';
import { IoIosClose } from 'react-icons/io';
import { Rate } from 'antd';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { AppInput, AppButton } from '..';
import { getImageUrl } from '../../utils/productUtils';

import styles from './AddReview.module.css';

const AddReview = props => {
  const { product, loading, error } = props;

  const handleOnSubmit = values => {
    props.onAddClick(values);
  };

  return (
    <div className={styles.outer__div}>
      <div
        className={styles.backdrop__div}
        onClick={props.drawerClickHandler}
      />
      <div className={styles.inner__div}>
        <div className={styles.flex__div} />
        <div className={styles.content__header}>
          <button
            className={styles.close__button}
            onClick={props.drawerClickHandler}
            disabled={loading}
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
            <Formik
              onSubmit={handleOnSubmit}
              initialValues={{
                title: '',
                description: '',
                rating: 0,
                id: product.id
              }}
              validationSchema={Yup.object().shape({
                title: Yup.string().required('Title is required'),
                description: Yup.string().required('Description is required'),
                rating: Yup.number()
                  .typeError('Invalid rating')
                  .min(1, 'Rating cannot be below 1')
                  .max(5, 'Rating cannot be above 5')
              })}
            >
              {({ isSubmitting, setFieldValue, values }) => {
                return (
                  <Form className={styles.detail__div}>
                    <span className={styles.product__name}>{product.name}</span>
                    <div className={styles.form__div}>
                      <span className={styles.input__label}>
                        Overall rating
                      </span>
                      <Rate
                        value={values.rating}
                        allowHalf={false}
                        style={{
                          color: 'black',
                          paddingLeft: '5px',
                          marginTop: '-2px',
                          fontSize: '30px'
                        }}
                        onChange={value => {
                          setFieldValue('rating', value);
                        }}
                        disabled={loading}
                      />
                      <ErrorMessage name="rating">
                        {message => (
                          <label className={styles.form__error}>
                            {message}
                          </label>
                        )}
                      </ErrorMessage>
                      <span className={styles.input__label}>Review title</span>
                      <AppInput
                        name="title"
                        type="text"
                        placeholder="Enter title"
                        loading={loading}
                      />
                      <span className={styles.input__label}>
                        Review description
                      </span>
                      <AppInput
                        name="description"
                        type="text"
                        placeholder="Tell us what you think"
                        component="textarea"
                        style={{ maxHeight: '100px', minHeight: '100px' }}
                        loading={loading}
                      />
                      {error && (
                        <span className={styles.main__error}>{error}</span>
                      )}
                    </div>
                    <AppButton
                      text="Add Review"
                      type="submit"
                      loading={loading}
                    />
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
        <div className={styles.flex__div} />
      </div>
    </div>
  );
};

export default AddReview;
