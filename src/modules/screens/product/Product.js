import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Loading } from '../../components';
import { useMergedState } from '../../utils/useMergedState';
import { getProductDetails } from '../../api/product';

import styles from './Product.module.css';

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
      setTimeout(() => {
        setState({ product: result, productLoading: false });
      }, 2000);
    } catch (err) {
      console.log(err);
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
    return <div>{JSON.stringify(product)}</div>;
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
