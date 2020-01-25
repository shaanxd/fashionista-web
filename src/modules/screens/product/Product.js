import React, { useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'react-slick';

import { Loading } from '../../components';
import { useMergedState } from '../../utils/useMergedState';
import { getProductDetails } from '../../api/product';
import { getImageUrl } from '../../utils/productUtils';

import styles from './Product.module.css';
import './Product.css';

var largeSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0
};

var miniSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0
};

const Product = props => {
  const [state, setState] = useMergedState({
    product: null,
    productLoading: true,
    productError: null
  });

  const largeRef = useRef(null);

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

  const handleImageClick = index => {
    largeRef.current.slickGoTo(index);
  };

  const renderImageCarousel = () => {
    const { images } = product;
    const withThumbnail = [product.thumbnail, ...images];
    const components = withThumbnail.map((image, index) => (
      <div className={styles.image__div}>
        <img
          key={index}
          className={styles.image}
          src={getImageUrl(image)}
          alt={image}
        />
      </div>
    ));

    return (
      <Slider ref={largeRef} {...largeSettings}>
        {components}
      </Slider>
    );
  };

  const renderMiniCarousel = () => {
    const { images } = product;
    const withThumbnail = [product.thumbnail, ...images];
    const components = withThumbnail.map((image, index) => (
      <div
        className={styles.image__div}
        onClick={() => {
          handleImageClick(index);
        }}
      >
        <img
          key={index}
          className={styles.image}
          src={getImageUrl(image)}
          alt={image}
        />
      </div>
    ));
    return <Slider {...miniSettings}>{components}</Slider>;
  };

  const renderProduct = () => {
    return (
      <div className={styles.product__div}>
        <div className={styles.content__div}>
          <div className={styles.carousel__div}>
            {renderImageCarousel()}
            <div className={styles.select__div}>{renderMiniCarousel()}</div>
          </div>
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
