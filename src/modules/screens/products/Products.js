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
    tagsLoading,
    tags,
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
      loadProductsFromApi();
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
      setTimeout(() => {
        setState({ productsLoading: false, products: [...result.products] });
      }, 1000);
    } catch (err) {
      console.log(err.message);
      setState({ productsLoading: false, productsError: null });
    }
  };

  const handleBrandSelect = id => {
    setState({ brand: brand === id ? null : id });
    //  loadProductsFromApi();
  };

  const handleGenderSelect = id => {
    setState({ gender: gender === id ? null : id });
    //  loadProductsFromApi();
  };

  const handleTypeSelect = id => {
    setState({ type: type === id ? null : id });
    //  loadProductsFromApi();
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

  const renderProductsLoading = () => {
    return <Loading text="Loading Products" />;
  };

  const renderProductsError = () => {
    return <Glitch text={productsError} onRetryClick={loadProductsFromApi} />;
  };

  const renderProductsEmpty = () => {
    return <div>List is empty</div>;
  };

  return (
    <div className={styles.main__div}>
      {tags && (
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
            header="Type"
            loading={productsLoading}
          />
        </div>
      )}
      <div className={styles.list__div}>
        {productsLoading
          ? renderProductsLoading()
          : productsError
          ? renderProductsError()
          : products.length === 0
          ? renderProductsEmpty()
          : renderProductList()}
      </div>
    </div>
  );
};

export default withRouter(Products);
