import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Rate } from 'antd';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AiOutlineWarning } from 'react-icons/ai';

import {
  Loading,
  ProductImage,
  SizePicker,
  QuantityPicker,
  AppButton,
  Glitch,
  ReviewList
} from '../../components';
import { useMergedState } from '../../utils/useMergedState';
import { getProductDetails, addReview, getReview } from '../../api/product';
import Sizes from '../../constants/sizes';
import { addToCart } from '../../actions/cart';

import styles from './Product.module.css';

const Product = props => {
  const [state, setState] = useMergedState({
    product: null,
    productLoading: true,
    productError: null,

    addVisible: false,

    addLoading: false,
    addError: null,

    reviewLoading: false,
    reviewError: null
  });

  const {
    product,
    productLoading,
    productError,
    addLoading,
    addError,
    addVisible
  } = state;

  useEffect(() => {
    loadProductDetails();
    //eslint-disable-next-line
  }, []);

  const loadReviews = async value => {
    try {
      setState({ reviewLoading: true, reviewError: null });
      const result = await getReview(product.id, value);
      setState({
        reviewLoading: false,
        product: { ...product, reviews: { ...result } }
      });
    } catch (err) {
      setState({ reviewLoading: false, reviewError: err.message });
    }
  };

  const loadProductDetails = async () => {
    try {
      const {
        match: {
          params: { id }
        }
      } = props;
      if (!productLoading) {
        setState({ productLoading: true, productError: null });
      }
      const result = await getProductDetails(id);
      setState({ product: result, productLoading: false });
    } catch (err) {
      setState({ productLoading: false, productError: err.message });
    }
  };

  const handleOnAddToCart = values => {
    if (props.auth) {
      props.addToCart(values);
    } else {
      props.history.push('/signin');
    }
  };

  const toggleAddVisible = () => {
    if (props.auth) {
      if (!addLoading) {
        setState(prevState => ({
          ...prevState,
          addVisible: !prevState.addVisible
        }));
      }
    } else {
      props.history.push('/signin');
    }
  };

  const handleOnAddReview = async ({ id, ...reviewData }) => {
    try {
      setState({ addLoading: true, addError: null });
      const result = await addReview(reviewData, id, props.auth.token);
      setState({
        addLoading: false,
        addVisible: false,
        product: { ...result }
      });
      loadProductDetails();
    } catch (err) {
      setState({ addLoading: false, addError: err.message });
    }
  };

  const renderLoading = () => {
    return <Loading text="Loading Product" />;
  };

  const renderError = () => {
    return (
      <Glitch
        text={productError}
        onRetry={loadProductDetails}
        icon={AiOutlineWarning}
      />
    );
  };

  const renderProduct = () => {
    const images = [product.thumbnail, ...product.images];

    return (
      <div className={styles.product__div}>
        <div className={styles.outer__div}>
          <ReviewList
            product={product}
            onAddClick={handleOnAddReview}
            addLoading={addLoading}
            addError={addError}
            visible={addVisible}
            onViewClick={toggleAddVisible}
            onPaginationClick={loadReviews}
          />
          <div className={styles.content__div}>
            <ProductImage images={images} />
            <div className={styles.product__content}>
              <span className={styles.product__name}>{product.name}</span>
              <span
                className={styles.product__price}
              >{`$ ${product.price}.00`}</span>
              <div className={styles.rating__div}>
                <Rate
                  style={{ color: 'rgb(231, 8, 135)', fontSize: 15 }}
                  defaultValue={0}
                  value={product.avgRating}
                  disabled
                  allowHalf
                />
                <div className={styles.separator__div} />
                <span className={styles.product__rating}>
                  {product.avgRating ? product.avgRating : '0.0'} stars
                </span>
              </div>
              <span className={styles.product__description}>
                {product.description}
              </span>
              <Formik
                initialValues={{ size: '', quantity: 1, productId: product.id }}
                validationSchema={Yup.object().shape({
                  size: Yup.string().required('Size is required'),
                  quantity: Yup.number()
                    .typeError('Quantity should be a number')
                    .min(1, 'Quantity should be atleast 1')
                    .max(5, 'Quantity cannot exceed 5')
                })}
                onSubmit={handleOnAddToCart}
              >
                {({ setFieldValue, values }) => {
                  return (
                    <Form>
                      <span className={styles.form__label}>
                        Available sizes:
                      </span>
                      <SizePicker options={Sizes} onChange={setFieldValue} />
                      <ErrorMessage name="size">
                        {message => (
                          <label className={styles.form__error}>
                            {message}
                          </label>
                        )}
                      </ErrorMessage>
                      <span className={styles.form__label}>Quantity:</span>
                      <QuantityPicker
                        value={values.quantity}
                        onChange={setFieldValue}
                      />
                      <ErrorMessage name="quantity">
                        {message => (
                          <label className={styles.form__error}>
                            {message}
                          </label>
                        )}
                      </ErrorMessage>
                      <div className={styles.button__container}>
                        <AppButton
                          text="Add to Cart"
                          type="submit"
                          loading={props.addLoading}
                        />
                      </div>
                      {props.addError && (
                        <span className={styles.main__error}>
                          {props.addError}
                        </span>
                      )}
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className={styles.main__div}>
      {productError
        ? renderError()
        : productLoading
        ? renderLoading()
        : renderProduct()}
    </div>
  );
};

const mapStateToProps = ({
  auth: { auth },
  cart: { addLoading, addError }
}) => {
  return { auth, addLoading, addError };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: cartData => {
      dispatch(addToCart(cartData));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Product)
);
