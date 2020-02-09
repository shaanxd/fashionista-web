import React, { useEffect } from 'react';

import { withRouter } from 'react-router-dom';
import { useMergedState, usePrevious } from '../../utils/useMergedState';
import {
  getAllTags,
  getHomeProducts,
  getProductByTag
} from '../../api/product';
import { TagList, ProductCard, Loading, Glitch } from '../../components';

import styles from './Products.module.css';
import { TAG_TYPES } from '../../constants/types';
import { AiOutlineShopping } from 'react-icons/ai';

const { TAG_BRAND, TAG_GENDER, TAG_TYPE } = TAG_TYPES;

const Products = props => {
  const {
    history: { location }
  } = props;

  const getTagTypes = type => {
    if (
      location.state &&
      location.state.tag &&
      location.state.tag.type === type
    ) {
      return location.state.tag.id;
    }
    return null;
  };

  const [state, setState] = useMergedState({
    tags: null,
    products: [],

    tagsLoading: true,
    tagsError: null,

    productsLoading: false,
    productsError: null,

    brand: getTagTypes(TAG_BRAND),
    type: getTagTypes(TAG_TYPE),
    gender: getTagTypes(TAG_GENDER)
  });

  const {
    tags,
    tagsLoading,
    tagsError,
    brand,
    type,
    gender,
    productsLoading,
    products,
    productsError
  } = state;

  const prevBrand = usePrevious(brand);
  const prevType = usePrevious(type);
  const prevGender = usePrevious(gender);

  useEffect(() => {
    if (brand !== prevBrand || type !== prevType || gender !== prevGender) {
      loadProductsFromApi();
    }
  });

  useEffect(() => {
    loadTagsFromApi();
    //eslint-disable-next-line
  }, []);

  const loadTagsFromApi = async (page = 0) => {
    try {
      if (!tagsLoading) {
        setState({ tagsLoading: true, tagsError: null });
      }
      const result = await getAllTags();
      setState({ tagsLoading: false, tags: { ...result } });
    } catch (err) {
      setState({ tagsLoading: false, tagsError: err.message });
    }
  };

  const loadProductsFromApi = async () => {
    try {
      if (!productsLoading) {
        setState({ productsLoading: true, productsError: null });
      }
      let array = [];
      brand && array.push(brand);
      type && array.push(type);
      gender && array.push(gender);
      const result =
        array.length === 0
          ? await getHomeProducts()
          : await getProductByTag({ cart: [...array] });
      setState({
        productsLoading: false,
        products: [...result.products]
      });
    } catch (err) {
      setState({ productsLoading: false, productsError: err.message });
    }
  };

  const handleBrandSelect = id => {
    setState({ brand: brand === id ? null : id });
  };

  const handleGenderSelect = id => {
    setState({ gender: gender === id ? null : id });
  };

  const handleTypeSelect = id => {
    setState({ type: type === id ? null : id });
  };

  const handleProductClick = id => {
    props.history.push(`/product/${id}`);
  };

  const renderProductList = () => {
    const items = products.map(product => (
      <div className={styles.list__item} key={product.id}>
        <ProductCard item={product} onProductClick={handleProductClick} />
      </div>
    ));
    return items;
  };

  const renderLoading = text => {
    return (
      <div className={styles.empty__list}>
        <Loading text={text} />
      </div>
    );
  };

  const renderError = (error, callback) => {
    return (
      <div className={styles.empty__list}>
        <Glitch text={error} onRetry={callback} />
      </div>
    );
  };

  const renderProductsEmpty = () => {
    return (
      <div className={styles.empty__list}>
        <AiOutlineShopping size={40} />
        <span className={styles.empty__text}>List is empty</span>
      </div>
    );
  };

  return tagsLoading
    ? renderLoading('Loading')
    : tagsError
    ? renderError(tagsError, loadTagsFromApi)
    : tags && (
        <div className={styles.main__div}>
          <div className={styles.tags__div}>
            <TagList
              onTagSelect={handleGenderSelect}
              items={tags.genders}
              value={gender}
              header="Genders"
              loading={productsLoading}
            />
            <TagList
              onTagSelect={handleBrandSelect}
              items={tags.brands}
              value={brand}
              header="Brands"
              loading={productsLoading}
            />
            <TagList
              onTagSelect={handleTypeSelect}
              items={tags.types}
              value={type}
              header="Categories"
              loading={productsLoading}
            />
          </div>
          <div className={styles.list__div}>
            {productsLoading
              ? renderLoading('Loading Products')
              : productsError
              ? renderError(productsError, loadProductsFromApi)
              : products.length === 0
              ? renderProductsEmpty()
              : renderProductList()}
          </div>
        </div>
      );
};

export default withRouter(Products);
