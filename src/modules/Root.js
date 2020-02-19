import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { Home, Signin, Signout, Signup, Product, AddTag, AddProduct, Checkout, Orders, Products } from './screens';
import { Toolbar, SideDrawer, Backdrop, Loading, AuthRoute, CartDrawer } from './components';
import { checkAuthValid } from './actions/auth';
import { usePrevious } from './utils/useMergedState';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'antd/dist/antd.css';
import styles from './Root.module.css';
import { getCart, deleteCart } from './actions/cart';
import { ROLES } from './constants/types';

const Root = props => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { auth: currentAuth } = props;

  const prevAuth = usePrevious(currentAuth);

  useEffect(() => {
    props.checkAuthValid();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!prevAuth && currentAuth) {
      props.getCart();
    }
  }, [currentAuth, prevAuth, props]);

  const drawerToggle = () => {
    setDrawerOpen(prevDrawerOpen => !prevDrawerOpen);
  };

  const backdropToggle = () => {
    setDrawerOpen(false);
    setCartOpen(false);
  };

  const cartToggle = () => {
    setCartOpen(prevCartOpen => !prevCartOpen);
  };

  const renderLoading = () => {
    return <Loading text="Loading" />;
  };

  const renderLogout = () => {
    return <Loading text="Logging out" />;
  };

  const handleDeleteItem = index => {
    props.deleteCartItem(index);
  };

  const renderContent = () => {
    return (
      <div className={styles.root}>
        <Router>
          <Toolbar
            drawerClickHandler={drawerToggle}
            cartClickHandler={cartToggle}
            numberOfProducts={props.cart.numberOfItems}
          />
          <SideDrawer isOpen={drawerOpen} drawerClickHandler={drawerToggle} />
          {(drawerOpen || cartOpen) && <Backdrop onClick={backdropToggle} />}
          <CartDrawer
            isOpen={cartOpen}
            onCartRetry={props.getCart}
            onDeleteCart={handleDeleteItem}
            cart={props.cart}
            loading={props.cartLoading}
            error={props.cartError}
            close={cartToggle}
            cartClickHandler={cartToggle}
          />
          <main className={styles.main}>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/signin">
                <Signin />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/signout">
                <Signout />
              </Route>
              <Route exact path="/product/:id">
                <Product />
              </Route>
              <Route exact path="/products">
                <Products />
              </Route>
              <Route exact path="/add-tag">
                <AuthRoute component={AddTag} role={ROLES.ROLE_ADMIN} auth={currentAuth} />
              </Route>
              <Route exact path="/add-product">
                <AuthRoute component={AddProduct} role={ROLES.ROLE_ADMIN} auth={currentAuth} />
              </Route>
              <Route exact path="/checkout">
                <AuthRoute
                  component={Checkout}
                  role={ROLES.ROLE_USER}
                  cartClickHandler={cartToggle}
                  auth={currentAuth}
                />
              </Route>
              <Route exact path="/orders">
                <AuthRoute component={Orders} role={ROLES.ROLE_USER} cartClickHandler={cartToggle} auth={currentAuth} />
              </Route>
            </Switch>
          </main>
        </Router>
      </div>
    );
  };

  return props.loading ? renderLoading() : props.logoutLoading ? renderLogout() : renderContent();
};

const mapStateToProps = ({ auth, cart: { cart, cartLoading, cartError } }) => {
  return {
    auth: auth.auth,
    loading: auth.checkAuthLoading,
    logoutLoading: auth.logoutLoading,
    cart,
    cartLoading,
    cartError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkAuthValid: () => {
      dispatch(checkAuthValid());
    },
    getCart: () => {
      dispatch(getCart());
    },
    deleteCartItem: index => {
      dispatch(deleteCart(index));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
