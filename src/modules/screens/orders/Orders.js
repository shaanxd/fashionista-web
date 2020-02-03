import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';

import {
  Pagination,
  PurchaseItem,
  CartItem,
  Loading,
  Glitch
} from '../../components';
import { useMergedState } from '../../utils/useMergedState';
import { getPurchases } from '../../api/cart';

import styles from './Orders.module.css';
import { AiOutlineShopping } from 'react-icons/ai';

const Orders = props => {
  const [state, setState] = useMergedState({
    purchases: {
      total: 0,
      current: 0,
      purchases: []
    },
    purchasesLoading: true,
    purchasesError: null,

    selectedOrder: null
  });

  const {
    purchasesLoading,
    purchases: { current, purchases, total },
    selectedOrder,
    purchasesError
  } = state;
  const {
    auth: { token }
  } = props;

  useEffect(() => {
    loadPurchases(current);
    //eslint-disable-next-line
  }, []);

  const setSelectedOrder = order => {
    setState({
      selectedOrder: { ...order }
    });
  };

  const loadPurchases = async value => {
    try {
      if (!purchasesLoading) {
        setState({ purchasesLoading: true, purchasesError: null });
      }
      const result = await getPurchases(token, value);
      setState({
        purchasesLoading: false,
        purchases: { ...result },
        selectedOrder: null
      });
    } catch (err) {
      setState({ purchasesLoading: false, purchasesError: err.message });
    }
  };

  const renderPurchasedItems = () => {
    const items = selectedOrder.purchases.map(purchase => {
      return <CartItem item={purchase} />;
    });

    return items;
  };

  const renderPurchases = () => {
    const items = purchases.map((purchase, index) => {
      return (
        <PurchaseItem
          key={purchase.id}
          purchase={purchase}
          isSelected={selectedOrder ? selectedOrder.id === purchase.id : false}
          onOrderClick={setSelectedOrder}
          isFirst={index === 0}
        />
      );
    });

    return items;
  };

  const renderLoading = () => {
    return <Loading text={'Loading purchase history'} />;
  };

  const renderError = () => {
    return (
      <Glitch
        text={purchasesError}
        onRetry={() => {
          loadPurchases(current);
        }}
      />
    );
  };

  const hasPurchases = !purchasesLoading && purchases.length !== 0;

  return purchasesLoading ? (
    renderLoading()
  ) : purchasesError ? (
    renderError()
  ) : hasPurchases ? (
    <div className={styles.main__div}>
      <div className={styles.content__div}>
        <div className={styles.list__div}>
          <div className={styles.list__container}>{renderPurchases()}</div>
          <Pagination
            current={current}
            total={total}
            onPaginationClick={loadPurchases}
            loading={purchasesLoading}
          />
        </div>
        <div className={styles.separator__div} />
        <div className={styles.items__div}>
          {selectedOrder ? (
            <div className={styles.item__list}>
              <div className={styles.header__content}>
                <div className={styles.order__header}>
                  <span
                    className={styles.header__title}
                  >{`ORDER ${selectedOrder.id
                    .replace(/-/g, '')
                    .toUpperCase()}`}</span>
                </div>
                <span className={styles.order__date}>{`Placed on ${Moment(
                  selectedOrder.orderedAt
                ).format('dddd, MMMM Do YYYY')}`}</span>
                <div className={styles.meta__header}>
                  <div className={styles.meta__group}>
                    <span className={styles.meta__title}>NUMBER OF ITEMS</span>
                    <span className={styles.meta__value}>
                      {selectedOrder.numberOfItems}
                    </span>
                  </div>
                  <div className={styles.meta__group}>
                    <span className={styles.meta__title}>TOTAL PRICE</span>
                    <span className={styles.meta__value}>
                      {`$${selectedOrder.totalPrice}`}
                    </span>
                  </div>
                  <div className={styles.meta__group}>
                    <span className={styles.meta__title}>PAID USING</span>
                    <span className={styles.meta__value}>CASH ON DELIVERY</span>
                  </div>
                  <div className={styles.meta__address}>
                    <span className={styles.meta__title}>SHIPPED TO</span>
                    <span className={styles.meta__value}>
                      Shahid Hassan, 434/B, Enderamulla, Wattala.
                    </span>
                  </div>
                </div>
                <span className={styles.list__header}>LIST OF ITEMS</span>
              </div>
              {renderPurchasedItems()}
            </div>
          ) : (
            <div className={styles.empty__div}>
              <AiOutlineShopping size={30} />
              <span className={styles.empty__text}>Select an Order</span>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.main__empty}>
      <AiOutlineShopping size={30} />
      <span className={styles.empty__text}>You do not have any orders.</span>
    </div>
  );
};

const mapStateToProps = ({ auth: { auth } }) => {
  return { auth };
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
