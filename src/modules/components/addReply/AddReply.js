import React from 'react';
import { IoIosClose } from 'react-icons/io';
import * as Yup from 'yup';
import Moment from 'moment';

import { getImageUrl } from '../../utils/productUtils';

import styles from './AddReply.module.css';
import AppInput from '../appInput/AppInput';
import { Formik, Form } from 'formik';
import AppButton from '../appButton/AppButton';

const AddReply = (props) => {
  const {
    inquiry: {
      id,
      product,
      owner: { fullName },
      title,
      description,
      replies,
      inquiryDate,
    },
    loading,
    error,
  } = props;

  const handleOnSubmit = (values) => {
    props.onAddClick(values);
  };

  const closeInquiry = () => {
    if (!loading) {
      props.drawerClickHandler(null);
    }
  };

  const renderRepliesList = () => {
    return replies.map(({ owner: { fullName }, replyDate, reply }) => {
      return (
        <div className={styles.list__item} key={id}>
          <div className={styles.image__container}>
            <span>{fullName.charAt(0)}</span>
          </div>
          <div className={styles.profile__header}>
            <span className={styles.user__name}>{fullName}</span>
            <span className={styles.posted__date}>{Moment(replyDate).fromNow()}</span>
            <span className={styles.description}>{reply}</span>
          </div>
        </div>
      );
    });
  };

  const renderEmptyReplies = () => {
    return (
      <div className={styles.empty__list}>
        <span>No replies. Be the first one to reply!</span>
      </div>
    );
  };

  return (
    <div className={styles.outer__div}>
      <div className={styles.backdrop__div} onClick={closeInquiry} />
      <div className={styles.inner__div}>
        <div className={styles.flex__div} />
        <div className={styles.content__header}>
          <button className={styles.close__button} onClick={closeInquiry} disabled={loading}>
            <IoIosClose color="gray" size={25} />
            <span className={styles.close__text}>CLOSE</span>
          </button>
        </div>
        <div className={styles.form__container}>
          <div className={styles.product__container}>
            <div className={styles.thumbnail__div}>
              <img src={getImageUrl(product.thumbnail)} className={styles.product__thumbnail} alt="thumbnail" />
            </div>
            <Formik
              onSubmit={handleOnSubmit}
              initialValues={{
                id,
                reply: '',
              }}
              validationSchema={Yup.object().shape({
                reply: Yup.string().required('Reply is required'),
              })}
            >
              {() => {
                return (
                  <Form className={styles.detail__div}>
                    <div className={styles.form__div}>
                      <div className={styles.inquiry__details}>
                        <div className={styles.inquiry__list__item}>
                          <div className={styles.list__outer}>
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
                        </div>
                      </div>
                      <span className={styles.input__label}>Replies</span>
                      <div className={styles.reply__list}>
                        {replies.length > 0 ? renderRepliesList() : renderEmptyReplies()}
                      </div>
                      <span className={styles.input__label}>Write a reply</span>
                      <AppInput
                        name="reply"
                        type="text"
                        placeholder="Tell us what you think"
                        component="textarea"
                        style={{ maxHeight: '100px', minHeight: '100px' }}
                        loading={loading}
                      />
                      {error && <span className={styles.main__error}>{error}</span>}
                      <AppButton
                        text="Add Reply"
                        type="submit"
                        loading={loading}
                        containerStyle={{ marginTop: '5px' }}
                      />
                    </div>
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

export default AddReply;
