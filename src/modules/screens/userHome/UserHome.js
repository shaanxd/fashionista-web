import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { HomeSearch, HomeCarousel } from '../../components';

import styles from './UserHome.module.css';
import { useMergedState } from '../../utils/useMergedState';
import { getHomeProducts, getTagsFromType } from '../../api/product';
import { CAROUSEL_TYPES, TAGS } from '../../constants/types';

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

  const handleTagClick = tagId => {
    console.log(tagId);
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

  return (
    <div className={styles.main__div}>
      {brands && (
        <HomeCarousel
          items={brands.tags}
          onItemClick={handleTagClick}
          leftHeader="FEATURED"
          rightHeader="BRANDS"
          type={CAROUSEL_TYPES.BRAND}
        />
      )}
      <HomeSearch navigate={props.history.push} />
      {products && (
        <HomeCarousel
          items={products.products}
          onItemClick={handleOnProductClick}
          leftHeader="FEATURED"
          rightHeader="PRODUCTS"
          type={CAROUSEL_TYPES.PRODUCT}
        />
      )}
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
