import React from 'react';
import { IoIosClose } from 'react-icons/io';
import * as Yup from 'yup';

import { getImageUrl } from '../../utils/productUtils';

import styles from './AddInquiry.module.css';
import AppInput from '../appInput/AppInput';
import { Formik, Form } from 'formik';
import AppButton from '../appButton/AppButton';

const AddInquiry = (props) => {
  const { product, loading, error } = props;

  const handleOnSubmit = (values) => {
    props.onAddClick(values);
  };

  return (
    <div className={styles.outer__div}>
      <div className={styles.backdrop__div} onClick={props.drawerClickHandler} />
      <div className={styles.inner__div}>
        <div className={styles.flex__div} />
        <div className={styles.content__header}>
          <button className={styles.close__button} onClick={props.drawerClickHandler} disabled={loading}>
            <IoIosClose color="gray" size={25} />
            <span className={styles.close__text}>CLOSE</span>
          </button>
        </div>
        <span className={styles.header__text}>Write an Inquiry</span>
        <div className={styles.form__container}>
          <div className={styles.product__container}>
            <div className={styles.thumbnail__div}>
              <img src={getImageUrl(product.thumbnail)} className={styles.product__thumbnail} alt="thumbnail" />
            </div>
            <Formik
              onSubmit={handleOnSubmit}
              initialValues={{
                title: '',
                description: '',
                id: product.id,
              }}
              validationSchema={Yup.object().shape({
                title: Yup.string().required('Title is required'),
                description: Yup.string().required('Description is required'),
              })}
            >
              {() => {
                return (
                  <Form className={styles.detail__div}>
                    <span className={styles.product__name}>{product.name}</span>
                    <div className={styles.form__div}>
                      <span className={styles.input__label}>Inquiry title</span>
                      <AppInput name="title" type="text" placeholder="Enter title" loading={loading} />
                      <span className={styles.input__label}>Inquiry description</span>
                      <AppInput
                        name="description"
                        type="text"
                        placeholder="Tell us what you wonder"
                        component="textarea"
                        style={{ maxHeight: '100px', minHeight: '100px' }}
                        loading={loading}
                      />
                      {error && <span className={styles.main__error}>{error}</span>}
                    </div>
                    <AppButton text="Add Inquiry" type="submit" loading={loading} />
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

export default AddInquiry;
