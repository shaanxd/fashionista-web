import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import AsyncSelect from 'react-select/async';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Icomoon, Loading } from '../../components';
import { useMergedState } from '../../utils/useMergedState';

import styles from './AddProduct.module.css';
import { searchProductTags } from '../../api/product';
import { createProduct } from '../../api/admin';

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
    imagesError,

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

  const handleOnSubmit = async ({ tags, ...values }) => {
    if (!thumbnail) {
      setState({ thumbnailError: 'Please pick a thumbnail image.' });
    } else if (images.length < 2) {
      setState({ imagesError: 'Please upload atleast 2 product images.' });
    } else {
      try {
        setState({ productLoading: true, productError: null });
        const productTags = tags.map(tag => tag.value);
        const productImages = images.map(image => image.file);
        const productData = {
          ...values,
          thumbnail,
          images: productImages,
          tags: productTags
        };
        await createProduct(productData, props.token);
        setState({ productLoading: false, productSuccess: true });
        setTimeout(() => {
          props.history.push('/');
        }, 2000);
      } catch (err) {
        setState({ productLoading: false, productError: err.message });
      }
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

  const loadOptions = async inputValue => {
    try {
      const result = await searchProductTags(inputValue);
      return result.map(({ id, name }) => {
        return {
          value: id,
          label: name
        };
      });
    } catch (err) {
      console.log(err);
    }
  };

  const renderSuccess = () => {
    return (
      <div className={styles.success__div}>
        <Icomoon icon="checkmark" color="#50C878" size={50} />
        <span className={styles.success__msg}>
          Product Added Successfully! Redirecting.
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
            <Icomoon icon="bin" color="#FFFFFF" size={20} />
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
            ),
            tags: Yup.array().min(
              2,
              'Product should belong to atleast two tags.'
            )
          })}
        >
          {({ setFieldValue, setFieldTouched }) => {
            return productLoading ? (
              renderLoading()
            ) : productSuccess ? (
              renderSuccess()
            ) : (
              <Form className={styles.tag__form}>
                <span className={styles.form__header}>Add Product</span>
                <AsyncSelect
                  isMulti
                  cacheOptions
                  isClearable
                  loadOptions={loadOptions}
                  onChange={values => {
                    setFieldValue('tags', values);
                  }}
                  onBlur={() => {
                    setFieldTouched('tags');
                  }}
                />
                <ErrorMessage name="tags">
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
                {thumbnail ? (
                  <div className={styles.thumbnail__div}>
                    <img
                      src={thumbnailPreview}
                      className={styles.image}
                      alt="Selected"
                    />
                    <button
                      type="button"
                      className={styles.delete__btn}
                      onClick={handleOnRemove}
                    >
                      <Icomoon icon="bin" color="#FFFFFF" size={30} />
                    </button>
                  </div>
                ) : (
                  <div {...getThumbRootProps({ className: styles.dropzone })}>
                    <input {...getThumbInputProps()} />
                    <p className={styles.dropzone__text}>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                )}
                {thumbnailError && (
                  <label className={styles.form__error}>{thumbnailError}</label>
                )}
                <div {...getImagesRootProps({ className: styles.dropzone })}>
                  <input {...getImagesInputProps()} />
                  <p className={styles.dropzone__text}>
                    Drag 'n' drop some files here, or click to select files
                  </p>
                </div>
                {imagesError && (
                  <label className={styles.form__error}>{imagesError}</label>
                )}
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
