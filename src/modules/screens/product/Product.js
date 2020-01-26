import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Loading, ProductImage } from '../../components';
import { useMergedState } from '../../utils/useMergedState';
import { getProductDetails } from '../../api/product';

import styles from './Product.module.css';
import { Rate } from 'antd';

const Product = props => {
  const [state, setState] = useMergedState({
    product: null,
    productLoading: true,
    productError: null
  });

  const { product, productLoading, productError } = state;

  useEffect(() => {
    loadProductDetails();
    //eslint-disable-next-line
  }, []);

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
      /* setTimeout(() => { */
      setState({ product: result, productLoading: false });
      /* }, 1000); */
    } catch (err) {
      setState({ productLoading: false, productError: err.message });
    }
  };

  const renderLoading = () => {
    return <Loading text="Loading Product" />;
  };

  const renderError = () => {
    return <div>{productError}</div>;
  };

  const renderProduct = () => {
    const images = [product.thumbnail, ...product.images];

    return (
      <div className={styles.product__div}>
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
              />
              <div className={styles.separator__div} />
              <span className={styles.product__rating}>
                {product.avgRating ? product.avgRating : '0.0'} stars
              </span>
            </div>
            <span className={styles.product__description}>
              {product.description}
            </span>
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

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Product)
);
