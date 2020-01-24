import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'react-slick';

import { Loading } from '../../components';
import { useMergedState } from '../../utils/useMergedState';
import { getProductDetails } from '../../api/product';
import { getImageUrl } from '../../utils/productUtils';

import styles from './Product.module.css';
import './Product.css';

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
      }, 1000);
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

  const renderImageCarousel = () => {
    var settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0
    };
    const { images } = product;
    const withThumbnail = [product.thumbnail, ...images];
    const components = withThumbnail.map((image, index) => (
      <img
        key={index}
        className={styles.image}
        src={getImageUrl(image)}
        alt={image}
      />
    ));
    return <Slider {...settings}>{components}</Slider>;
  };

  const renderProduct = () => {
    return (
      <div className={styles.product__div}>
        <div className={styles.content__div}>
          <div className={styles.carousel__div}>{renderImageCarousel()}</div>
          <div className={styles.product__content}></div>
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
