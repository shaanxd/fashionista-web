import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Loading, Glitch, ProductCard, PageHeader } from '../../components';
import { useMergedState } from '../../utils/useMergedState';

import styles from './Wishlist.module.css';
import { getWishlist } from '../../api/product';
import { useEffect } from 'react';

const Wishlist = (props) => {
  const [state, setState] = useMergedState({
    loading: true,
    error: null,
    products: [],
  });

  const { loading, error, products } = state;
  const { token } = props;

  useEffect(
    () => {
      loadWishlistFromApi();
    },
    //eslint-disable-next-line
    []
  );

  const loadWishlistFromApi = async () => {
    try {
      setState({ loading: true, error: null });
      const { products: wishlist } = await getWishlist(token);
      setState({ products: [...wishlist], loading: false });
    } catch (err) {
      setState({ loading: false, error: err.message });
    }
  };

  const renderGlitch = () => {
    return <Glitch text={error} onRetryClick={loadWishlistFromApi} />;
  };

  const renderLoading = () => {
    return <Loading text="Loading Wishlist" />;
  };

  const handleProductClick = (id) => {
    props.history.push(`/product/${id}`);
  };

  const renderWishlistItems = () => {
    return products.map((product) => {
      return (
        <div className={styles.product__div}>
          <ProductCard item={product} onProductClick={handleProductClick} />
        </div>
      );
    });
  };

  const renderWishlist = () => {
    return (
      <div className={styles.wishlist__div}>
        <PageHeader text="Your Wishlist" />
        <div className={styles.list__div}>{renderWishlistItems()}</div>
      </div>
    );
  };

  return (
    <div className={styles.main__div}>{loading ? renderLoading() : error ? renderGlitch() : renderWishlist()}</div>
  );
};

const mapStateToProps = ({
  auth: {
    auth: { token },
  },
}) => {
  return { token };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wishlist));
