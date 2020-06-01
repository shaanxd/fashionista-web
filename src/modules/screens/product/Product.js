import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Rate } from 'antd';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AiOutlineWarning } from 'react-icons/ai';
import cogoToast from 'cogo-toast';

import {
  Loading,
  ProductImage,
  SizePicker,
  QuantityPicker,
  AppButton,
  Glitch,
  ReviewList,
  InquiriesList,
} from '../../components';
import { useMergedState } from '../../utils/useMergedState';
import { getProductDetails, addReview, getReview, getIsWishlisted, toggleWishlist } from '../../api/product';
import Sizes from '../../constants/sizes';
import { addToCart } from '../../actions/cart';

import styles from './Product.module.css';

const Product = (props) => {
  const [state, setState] = useMergedState({
    product: null,
    productLoading: true,
    productError: null,

    addVisible: false,

    addLoading: false,
    addError: null,

    reviewLoading: false,

    wishlistLoading: true,
    wishlisted: false,

    inquiryVisible: false,

    inquiryAddLoading: false,
    inquiryAddError: null,

    inquiryLoading: false,
  });

  const {
    product,
    productLoading,
    productError,
    addLoading,
    addError,
    addVisible,
    reviewLoading,
    wishlistLoading,
    wishlisted,
    inquiryVisible,
    inquiryAddLoading,
    inquiryAddError,
    inquiryLoading,
  } = state;

  const { auth } = props;

  useEffect(() => {
    loadProductDetails();
    //eslint-disable-next-line
  }, []);

  const loadReviews = async (value) => {
    try {
      setState({ reviewLoading: true });
      const result = await getReview(product.id, value);
      setState({
        reviewLoading: false,
        product: { ...product, reviews: { ...result } },
      });
    } catch (err) {
      cogoToast.error(err.message, { position: 'bottom-left' });
      setState({ reviewLoading: false });
    }
  };

  const loadInquiries = async (value) => {
    try {
      setState({ inquiryLoading: true });
      const result = {};
      setState({
        inquiryLoading: false,
        product: { ...product, inquiries: { ...result } },
      });
    } catch (err) {
      cogoToast.error(err.message, { position: 'bottom-left' });
      setState({ inquiryLoading: false });
    }
  };

  const loadWishlistedUnauth = async (value) => {
    setState({ wishlistLoading: false });
  };

  const loadWishlistedAuth = async () => {
    try {
      const {
        match: {
          params: { id },
        },
      } = props;
      setState({ wishlistLoading: true });
      const { favourited } = await getIsWishlisted(id, auth.token);
      setState({ wishlisted: favourited, wishlistLoading: false });
    } catch (err) {
      cogoToast.error(err.message, { position: 'bottom-left' });
      setState({ wishlistLoading: false });
    }
  };

  const loadProductDetails = async () => {
    try {
      const {
        match: {
          params: { id },
        },
      } = props;
      if (!productLoading) {
        setState({ productLoading: true, productError: null });
      }
      const result = await getProductDetails(id);
      setState({ product: result, productLoading: false });
      if (auth) {
        loadWishlistedAuth();
      } else {
        loadWishlistedUnauth();
      }
    } catch (err) {
      setState({ productLoading: false, productError: err.message });
    }
  };

  const handleToggleWishlist = async () => {
    try {
      const {
        match: {
          params: { id },
        },
      } = props;
      setState({ wishlistLoading: true });
      const { favourited } = await toggleWishlist(id, auth.token);
      setState({ wishlisted: favourited, wishlistLoading: false });
    } catch (err) {
      cogoToast.error(err.message, { position: 'bottom-left' });
      setState({ wishlistLoading: false });
    }
  };

  const handleOnAddToCart = (values) => {
    if (props.auth) {
      props.addToCart(values);
    } else {
      props.history.push('/signin');
    }
  };

  const toggleAddVisible = () => {
    if (props.auth) {
      if (!addLoading) {
        setState((prevState) => ({
          ...prevState,
          addVisible: !prevState.addVisible,
        }));
      }
    } else {
      props.history.push('/signin');
    }
  };

  const toggleInquiryVisible = () => {
    if (props.auth) {
      if (!inquiryAddLoading) {
        setState((prevState) => ({
          ...prevState,
          inquiryVisible: !prevState.inquiryVisible,
        }));
      }
    } else {
      props.history.push('/signin');
    }
  };

  const handleOnAddReview = async ({ id, ...reviewData }) => {
    try {
      setState({ addLoading: true, addError: null });
      await addReview(reviewData, id, props.auth.token);
      setState({
        addLoading: false,
        addVisible: false,
      });
      loadProductDetails();
    } catch (err) {
      setState({ addLoading: false, addError: err.message });
    }
  };

  const handleOnAddInquiry = async ({ id, ...inquiryData }) => {
    try {
      setState({ inquiryAddLoading: true, inquiryAddError: null });
      const result = {};
      setState({
        inquiryAddLoading: false,
        inquiryVisible: false,
      });
      loadProductDetails();
    } catch (err) {
      setState({ inquiryAddLoading: false, inquiryAddError: err.message });
    }
  };

  const renderLoading = () => {
    return <Loading text="Loading Product" />;
  };

  const renderError = () => {
    return <Glitch text={productError} onRetry={loadProductDetails} icon={AiOutlineWarning} />;
  };

  const renderProduct = () => {
    const images = [product.thumbnail, ...product.images];

    return (
      <div className={styles.product__div}>
        <div className={styles.outer__div}>
          <div className={styles.content__div}>
            <ProductImage images={images} />
            <div className={styles.product__content}>
              <span className={styles.product__name}>{product.name}</span>
              <span className={styles.product__price}>{`$ ${product.price.toFixed(2)}`}</span>
              <div className={styles.rating__div}>
                <Rate
                  style={{ color: '#F63854', fontSize: 15 }}
                  defaultValue={0}
                  value={product.avgRating}
                  disabled
                  allowHalf
                />
                <div className={styles.separator__div} />
                <span className={styles.product__rating}>{product.avgRating ? product.avgRating : '0.0'} stars</span>
              </div>
              <span className={styles.form__label}>Product Description:</span>
              <span className={styles.product__description}>{product.description}</span>
              <Formik
                initialValues={{ size: '', quantity: 1, productId: product.id }}
                validationSchema={Yup.object().shape({
                  size: Yup.string().required('Size is required'),
                  quantity: Yup.number()
                    .typeError('Quantity should be a number')
                    .min(1, 'Quantity should be atleast 1')
                    .max(5, 'Quantity cannot exceed 5'),
                })}
                onSubmit={handleOnAddToCart}
              >
                {({ setFieldValue, values }) => {
                  return (
                    <Form>
                      <span className={styles.form__label}>Available sizes:</span>
                      <SizePicker options={Sizes} onChange={setFieldValue} />
                      <ErrorMessage name="size">
                        {(message) => <label className={styles.form__error}>{message}</label>}
                      </ErrorMessage>
                      <span className={styles.form__label}>Quantity:</span>
                      <QuantityPicker value={values.quantity} onChange={setFieldValue} />
                      <ErrorMessage name="quantity">
                        {(message) => <label className={styles.form__error}>{message}</label>}
                      </ErrorMessage>
                      <AppButton
                        text="Add to Cart"
                        type="submit"
                        loading={props.addLoading}
                        containerStyle={{ marginTop: '20px' }}
                      />
                      <AppButton
                        text={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        type="button"
                        onClick={handleToggleWishlist}
                        loading={wishlistLoading}
                        containerStyle={{ marginTop: '20px' }}
                      />
                      {props.addError && <span className={styles.main__error}>{props.addError}</span>}
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
          <ReviewList
            product={product}
            onAddClick={handleOnAddReview}
            addLoading={addLoading}
            addError={addError}
            visible={addVisible}
            onViewClick={toggleAddVisible}
            onPaginationClick={loadReviews}
            reviewLoading={reviewLoading}
          />
          <InquiriesList
            inquiries={product.inquiries}
            onViewClick={toggleInquiryVisible}
            onPaginationClick={loadInquiries}
            loading={inquiryLoading}
            error={inquiryAddError}
            onAddClick={handleOnAddInquiry}
            visible={inquiryVisible}
          />
        </div>
      </div>
    );
  };
  return (
    <div className={styles.main__div}>
      {productError ? renderError() : productLoading ? renderLoading() : renderProduct()}
    </div>
  );
};

const mapStateToProps = ({ auth: { auth }, cart: { addLoading, addError } }) => {
  return { auth, addLoading, addError };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (cartData) => {
      dispatch(addToCart(cartData));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Product));
