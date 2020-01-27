import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AiOutlineShopping } from 'react-icons/ai';

import { DrawerToggleButton } from '../';

import './Toolbar.css';
import { logoutUser } from '../../actions/auth';
import CartDropdown from '../cartDropdown/CartDropdown';
import { getCart, deleteCart } from '../../actions/cart';

const Toolbar = props => {
  const { auth, cart, cartLoading, cartError } = props;

  const handleLoginClick = () => {
    props.history.push('/signin');
  };

  const handleSignupClick = () => {
    props.history.push('/signup');
  };

  const handleHomeClick = () => {
    props.history.push('/');
  };

  const handleLogoutClick = () => {
    props.logout();
  };

  const handleDeleteItem = index => {
    props.deleteCartItem(index);
  };
  const renderUnauthRoutes = () => {
    return (
      <ul>
        <li>
          <span
            className={
              props.location.pathname === '/signin'
                ? 'toolbar__navigation-link active'
                : 'toolbar__navigation-link'
            }
            onClick={handleLoginClick}
          >
            Signin
          </span>
        </li>
        <li>
          <span
            className={
              props.location.pathname === '/signup'
                ? 'toolbar__navigation-link active'
                : 'toolbar__navigation-link'
            }
            onClick={handleSignupClick}
          >
            Signup
          </span>
        </li>
      </ul>
    );
  };

  const renderAuthRoutes = () => (
    <ul>
      <li>
        <span className="toolbar__navigation-link" onClick={handleLogoutClick}>
          Signout
        </span>
        <div className="toolbar__navigation-link cart__parent">
          <AiOutlineShopping color="gray" size="25px" />
          <div className="cart__container">
            <div className={'arrow__container'}>
              <div className={'arrow__div'} />
            </div>
            <CartDropdown
              onCartRetry={props.onCartRetry}
              onDeleteCart={handleDeleteItem}
              cart={cart}
              loading={cartLoading}
              error={cartError}
            />
          </div>
        </div>
      </li>
    </ul>
  );

  const navigationRoutes = auth ? renderAuthRoutes() : renderUnauthRoutes();

  return (
    <header className="toolbar">
      <nav className="toolbar__navigation">
        <div className="toolbar__toggle-button">
          <DrawerToggleButton onClick={props.drawerClickHandler} />
        </div>
        <div className="toolbar__logo">
          <span onClick={handleHomeClick}>
            <span className="toolbar__logo-dark">Fashion</span>
            <span className="toolbar__logo-light">ista</span>
          </span>
        </div>
        <div className="spacer" />
        <div className="toolbar__navigation-items">{navigationRoutes}</div>
      </nav>
    </header>
  );
};

const mapStateToProps = ({
  auth: { auth },
  cart: { cart, cartLoading, cartError }
}) => {
  return {
    auth,
    cart,
    cartLoading,
    cartError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logoutUser());
    },
    onCartRetry: () => {
      dispatch(getCart());
    },
    deleteCartItem: index => {
      dispatch(deleteCart(index));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Toolbar)
);
