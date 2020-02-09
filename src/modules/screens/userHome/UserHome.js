import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { HomeSearch, HomeCarousel, Glitch, Loading } from '../../components';
import { useMergedState } from '../../utils/useMergedState';
import { getHomeProducts, getTagsFromType } from '../../api/product';
import { CAROUSEL_TYPES, TAGS } from '../../constants/types';

import styles from './UserHome.module.css';

const UserHome = props => {
  const [state, setState] = useMergedState({
    products: null,
    productsLoading: true,
    productsError: null,

    brands: null,
    brandsLoading: true,
    brandsError: null
  });

  const {
    products,
    productsLoading,
    productsError,
    brands,
    brandsLoading,
    brandsError
  } = state;

  useEffect(() => {
    loadProductsFromApi();
    loadBrandsFromApi();
    //eslint-disable-next-line
  }, []);

  const handleOnProductClick = productId => {
    props.history.push(`/product/${productId}`);
  };

  const handleTagClick = tag => {
    props.history.push('/products', { tag });
  };

  const handleTagClickWithoutTag = () => {
    props.history.push('/products');
  };

  const loadProductsFromApi = async () => {
    try {
      if (!productsLoading) {
        setState({ productsLoading: true, productsError: null });
      }
      const result = await getHomeProducts();
      setState({ productsLoading: false, products: { ...result } });
    } catch (err) {
      setState({ productsLoading: false, productsError: err.message });
    }
  };

  const loadBrandsFromApi = async () => {
    try {
      if (!brandsLoading) {
        setState({ brandsLoading: true, brandsError: null });
      }
      const result = await getTagsFromType(TAGS[0].value);
      setState({ brandsLoading: false, brands: { ...result } });
    } catch (err) {
      setState({ brandsLoading: false, brandsError: err.message });
    }
  };

  const renderLoading = () => {
    return (
      <Loading text={brandsLoading ? 'Loading Brands' : 'Loading Products'} />
    );
  };

  const renderError = () => {
    return (
      <Glitch
        text={brandsError || productsError}
        onRetry={brandsError ? loadBrandsFromApi : loadProductsFromApi}
      />
    );
  };

  return brandsLoading || productsLoading
    ? renderLoading()
    : brandsError || productsError
    ? renderError()
    : brands &&
      products && (
        <div className={styles.main__div}>
          <HomeCarousel
            items={brands.tags}
            onItemClick={handleTagClick}
            leftHeader="FEATURED"
            rightHeader="BRANDS"
            type={CAROUSEL_TYPES.BRAND}
            onMoreClick={handleTagClickWithoutTag}
          />
          <HomeSearch navigate={props.history.push} />
          <HomeCarousel
            items={products.products}
            onItemClick={handleOnProductClick}
            leftHeader="FEATURED"
            rightHeader="PRODUCTS"
            type={CAROUSEL_TYPES.PRODUCT}
            onMoreClick={handleTagClickWithoutTag}
          />
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
  connect(mapStateToProps, mapDispatchToProps)(UserHome)
);
