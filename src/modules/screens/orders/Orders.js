import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AiOutlineShopping } from 'react-icons/ai';

import { Pagination, PurchaseItem, Loading, Glitch, OrderDetails, PageHeader } from '../../components';
import { useMergedState } from '../../utils/useMergedState';
import { getPurchases } from '../../api/cart';

import styles from './Orders.module.css';

const Orders = (props) => {
  const [state, setState] = useMergedState({
    purchases: {
      total: 0,
      current: 0,
      purchases: [],
    },
    purchasesLoading: true,
    purchasesError: null,

    selectedOrder: null,
  });

  const {
    purchasesLoading,
    purchases: { current, purchases, total },
    selectedOrder,
    purchasesError,
  } = state;
  const {
    auth: { token },
  } = props;

  useEffect(() => {
    loadPurchases(current);
    //eslint-disable-next-line
  }, []);

  const setSelectedOrder = (order) => {
    setState({
      selectedOrder: { ...order },
    });
  };

  const loadPurchases = async (value) => {
    try {
      if (!purchasesLoading) {
        setState({ purchasesLoading: true, purchasesError: null });
      }
      const result = await getPurchases(token, value);
      setState({
        purchasesLoading: false,
        purchases: {
          ...result,
        },
        selectedOrder: result.purchases.length > 0 ? { ...result.purchases[0] } : null,
      });
    } catch (err) {
      setState({ purchasesLoading: false, purchasesError: err.message });
    }
  };

  const renderPurchases = () => {
    const items = purchases.map((purchase) => {
      return (
        <PurchaseItem
          key={purchase.id}
          purchase={purchase}
          isSelected={selectedOrder ? selectedOrder.id === purchase.id : false}
          onOrderClick={setSelectedOrder}
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
      <div className={styles.outer__div}>
        <PageHeader text="Your Orders" />
        <div className={styles.content__div}>
          <div className={styles.list__div}>
            <div className={styles.list__container}>{renderPurchases()}</div>
            <Pagination current={current} total={total} onPaginationClick={loadPurchases} loading={purchasesLoading} />
          </div>
          <div className={styles.separator__div} />
          <div className={styles.items__div}>
            {selectedOrder ? (
              <OrderDetails item={selectedOrder} />
            ) : (
              <div className={styles.empty__div}>
                <AiOutlineShopping size={30} />
                <span className={styles.empty__text}>Select an Order</span>
              </div>
            )}
          </div>
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

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
