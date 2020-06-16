import React from 'react';
import Moment from 'moment';

import styles from './Inquiries.module.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useMergedState } from '../../utils/useMergedState';
import {
  Loading,
  Glitch,
  PageHeader,
  Pagination,
  AppButton,
  AddReply
} from '../../components';
import { getAllInquiries, addReply } from '../../api/admin';
import { useEffect } from 'react';
import { AiOutlineShopping } from 'react-icons/ai';

const Inquiries = props => {
  const [state, setState] = useMergedState({
    loading: true,
    error: null,
    inquiries: {
      current: 0,
      total: 0,
      inquiries: []
    },
    selected: null,
    replyLoading: false,
    replyError: null
  });

  const {
    loading,
    error,
    inquiries: { current, total, inquiries },
    selected,
    replyLoading,
    replyError
  } = state;
  const { token } = props;

  useEffect(
    () => {
      getInquiriesFromApi(0);
    }, //eslint-disable-next-line
    []
  );

  const getInquiriesFromApi = async value => {
    try {
      setState({ loading: true, error: null });
      const result = await getAllInquiries(token, value);
      setState({ loading: false, inquiries: { ...result } });
    } catch (err) {
      setState({ loading: false, error: err.message });
    }
  };

  const getUpdatedInquiries = inquiry => {
    const index = inquiries.findIndex(element => element.id === inquiry.id);
    let updated = [...inquiries];

    if (index > -1) {
      updated[index] = { ...inquiry };
    }

    return updated;
  };

  const onAddReply = async ({ id, ...replyData }) => {
    try {
      setState({ replyLoading: true, replyError: null });
      const result = await addReply(id, replyData, token);
      const updated = getUpdatedInquiries(result);
      setState({
        replyLoading: false,
        inquiries: { ...state.inquiries, inquiries: [...updated] },
        selected: { ...result }
      });
    } catch (err) {
      setState({ replyLoading: false, replyError: err.message });
    }
  };

  const renderLoading = () => {
    return <Loading text="Loading Inquiries" />;
  };

  const renderGlitch = () => {
    return (
      <Glitch
        text={error}
        onRetry={() => {
          getInquiriesFromApi(0);
        }}
      />
    );
  };

  const onViewInquiry = inquiry => {
    setState({ selected: inquiry ? { ...inquiry } : null });
  };

  const renderInquiriesList = () => {
    return inquiries.map(inquiry => {
      const {
        id,
        owner: { fullName },
        inquiryDate,
        title,
        description,
        product: { name }
      } = inquiry;
      return (
        <div className={styles.list__item} key={id}>
          <div className={styles.list__outer}>
            <div className={styles.header__container}>
              <div className={styles.image__container}>
                <span>{fullName.charAt(0)}</span>
              </div>
              <div className={styles.profile__header}>
                <span className={styles.user__name}>
                  {fullName} on {name}
                </span>
                <span className={styles.posted__date}>
                  {Moment(inquiryDate).fromNow()}
                </span>
              </div>
            </div>
            <div className={styles.details__container}>
              <span className={styles.title}>{title}</span>
              <span className={styles.description}>{description}</span>
            </div>
          </div>
          <div className={styles.button__container}>
            <AppButton
              text="Reply"
              onClick={() => {
                onViewInquiry(inquiry);
              }}
            />
          </div>
        </div>
      );
    });
  };

  const renderEmptyList = () => {
    return (
      <div className={styles.empty__list}>
        <AiOutlineShopping size={30} />
        <span>No Inquiries at the moment!</span>
      </div>
    );
  };

  const renderInquiries = () => {
    return (
      <div className={styles.outer__div}>
        <PageHeader text="All Inquiries" />
        {inquiries.length > 0 ? renderInquiriesList() : renderEmptyList()}
        {inquiries.length > 0 && (
          <Pagination
            current={current}
            total={total}
            onPaginationClick={getInquiriesFromApi}
            loading={loading}
          />
        )}
        {selected && (
          <AddReply
            drawerClickHandler={onViewInquiry}
            inquiry={selected}
            loading={replyLoading}
            onAddClick={onAddReply}
            error={replyError}
          />
        )}
      </div>
    );
  };

  return (
    <div className={styles.main__div}>
      {loading ? renderLoading() : error ? renderGlitch() : renderInquiries()}
    </div>
  );
};

const mapStateToProps = ({
  auth: {
    auth: { token }
  }
}) => {
  return { token };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Inquiries)
);
