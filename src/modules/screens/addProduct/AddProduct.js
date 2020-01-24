import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Select from 'react-select';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Icomoon, Loading } from '../../components';
import { useMergedState } from '../../utils/useMergedState';
import { TAGS } from '../../constants/types';

import styles from './AddProduct.module.css';

const AddProduct = props => {
  const [state, setState] = useMergedState({
    thumbnail: null,
    thumbnailError: null,
    thumbnailPreview: null,

    images: [],
    imagesError: null,

    productLoading: false,
    productError: null,
    productSuccess: false
  });

  const {
    thumbnail,
    thumbnailError,
    thumbnailPreview,

    images,

    productLoading,
    productError,
    productSuccess
  } = state;

  useEffect(
    () => () => {
      URL.revokeObjectURL(thumbnailPreview);
    },
    [thumbnailPreview]
  );

  useEffect(
    () => () => {
      images.forEach(({ preview }) => URL.revokeObjectURL(preview));
    },
    [images]
  );

  const handleOnRemove = () => {
    setState({ thumbnail: null, thumbnailPreview: null });
  };

  const handleOnSubmit = async ({ type, ...values }) => {
    if (thumbnail) {
      // submit
    } else {
      setState({ thumbnailError: 'Please pick a tag image.' });
    }
  };

  const onThumbnailDrop = acceptedFiles => {
    if (acceptedFiles.length > 0) {
      setState({
        thumbnail: acceptedFiles[0],
        thumbnailError: null,
        thumbnailPreview: URL.createObjectURL(acceptedFiles[0])
      });
    }
  };

  const onImagesDrop = acceptedFiles => {
    const withPrev = acceptedFiles.map(file => {
      return {
        file,
        preview: URL.createObjectURL(file)
      };
    });
    setState({
      images: [...images, ...withPrev],
      imagesError: null
    });
  };

  const {
    getRootProps: getThumbRootProps,
    getInputProps: getThumbInputProps
  } = useDropzone({
    multiple: false,
    accept: 'image/jpeg',
    onDrop: onThumbnailDrop
  });

  const {
    getRootProps: getImagesRootProps,
    getInputProps: getImagesInputProps
  } = useDropzone({
    multiple: true,
    accept: 'image/jpeg',
    onDrop: onImagesDrop
  });

  const renderLoading = () => {
    return <Loading text="Adding Product" />;
  };

  const removeImage = index => {
    const updated = images.filter((_, i) => i !== index);
    setState({ images: [...updated] });
  };

  const renderSuccess = () => {
    return (
      <div className={styles.success__div}>
        <Icomoon icon="checkmark" color="#50C878" size={50} />
        <span className={styles.success__msg}>
          Product Addedd Successfully! Redirecting.
        </span>
      </div>
    );
  };

  const renderImageList = () => {
    const itemsToRender = images.map((image, index) => {
      return (
        <div className={styles.image__div} key={image.preview}>
          <img
            src={image.preview}
            alt="product"
            className={styles.list__image}
          />
          <button
            type="button"
            className={styles.delete__btn}
            onClick={() => removeImage(index)}
          >
            <Icomoon icon="cross" color="#FFFFFF" size={30} />
          </button>
        </div>
      );
    });
    return <div className={styles.images__div}>{itemsToRender}</div>;
  };

  return (
    <div className={styles.main__div}>
      <div className={styles.form__div}>
        <Formik
          initialValues={{
            price: '0.00',
            stock: 0,
            name: '',
            description: '',
            tags: []
          }}
          onSubmit={handleOnSubmit}
          validationSchema={Yup.object().shape({
            price: Yup.number()
              .typeError('Price must be a number')
              .positive('Price must be more than zero'),
            stock: Yup.number()
              .typeError('Stock must be a number')
              .positive('Stock must be more than zero'),
            name: Yup.string().required('Product name is required'),
            description: Yup.string().required(
              'Product description is required'
            )
          })}
        >
          {({ values, setFieldValue, setFieldTouched }) => {
            return productLoading ? (
              renderLoading()
            ) : productSuccess ? (
              renderSuccess()
            ) : (
              <Form className={styles.tag__form}>
                <span className={styles.form__header}>Add Product</span>
                <Select
                  isClearable
                  options={TAGS}
                  value={values.type}
                  onChange={option => {
                    setFieldValue('type', option);
                  }}
                  onBlur={() => {
                    setFieldTouched('type');
                  }}
                  placeholder="Select type"
                />
                <ErrorMessage name="type">
                  {message => (
                    <label className={styles.form__error}>{message}</label>
                  )}
                </ErrorMessage>
                <Field
                  name="name"
                  placeholder="Enter Product Name"
                  className={styles.form__input}
                />
                <ErrorMessage name="name">
                  {message => (
                    <label className={styles.form__error}>{message}</label>
                  )}
                </ErrorMessage>
                <Field
                  name="description"
                  placeholder="Enter Product Description"
                  className={styles.form__input}
                />
                <ErrorMessage name="description">
                  {message => (
                    <label className={styles.form__error}>{message}</label>
                  )}
                </ErrorMessage>
                <Field
                  name="price"
                  className={styles.form__input}
                  step="0.01"
                />
                <ErrorMessage name="price">
                  {message => (
                    <label className={styles.form__error}>{message}</label>
                  )}
                </ErrorMessage>
                <Field name="stock" className={styles.form__input} />
                <ErrorMessage name="stock">
                  {message => (
                    <label className={styles.form__error}>{message}</label>
                  )}
                </ErrorMessage>
                <div {...getThumbRootProps({ className: styles.dropzone })}>
                  <input {...getThumbInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
                {thumbnail && (
                  <div className={styles.file__div}>
                    <img
                      src={thumbnailPreview}
                      className={styles.image}
                      alt="Selected"
                    />
                    <button
                      type="button"
                      className={styles.remove__btn}
                      onClick={handleOnRemove}
                    >
                      <Icomoon icon="bin" color="#8D021F" size={20} />
                    </button>
                  </div>
                )}
                {thumbnailError && (
                  <label className={styles.form__error}>{thumbnailError}</label>
                )}
                <div {...getImagesRootProps({ className: styles.dropzone })}>
                  <input {...getImagesInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>

                {images.length > 0 && renderImageList()}
                <button className={styles.submit__btn} type="submit">
                  Create Tag
                </button>
                {productError && (
                  <label className={styles.main__error}>{productError}</label>
                )}
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth: { auth } }) => {
  return {
    token: auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddProduct)
);
