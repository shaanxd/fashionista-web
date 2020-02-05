import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { HomeSearch, ProductCarousel } from '../../components';

import styles from './UserHome.module.css';
import { useMergedState } from '../../utils/useMergedState';
import { getHomeProducts } from '../../api/product';

const UserHome = props => {
  const [state, setState] = useMergedState({
    products: null,
    productsLoading: true,
    productsError: null
  });

  const { products, productsLoading, productsError } = state;

  useEffect(() => {
    loadProductsFromApi();
    //eslint-disable-next-line
  }, []);

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

  console.log(products);

  return (
    <div className={styles.main__div}>
      <HomeSearch navigate={props.history.push} />
      {products && <ProductCarousel products={products.products} />}
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
