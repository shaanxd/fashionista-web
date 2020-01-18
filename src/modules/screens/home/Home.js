import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { List, Avatar, Rate } from 'antd';

import { Icomoon, Loading } from '../../components';
import { useMergedState } from '../../utils/useMergedState';
import { getSearchKeywords } from '../../api/product';
import { getImageUrl } from '../../utils/productUtils';

import styles from './Home.module.css';

const Home = props => {
  const [state, setState] = useMergedState({
    visible: false,
    searchResults: [],
    searchLoading: false,
    searchError: null,
    hasText: false
  });

  const { searchError, searchLoading, searchResults, hasText } = state;

  const onFocusGain = () => {
    setState({ visible: true });
  };

  const onFocusLoss = () => {
    setTimeout(() => {
      setState({ visible: false });
    }, 100);
  };

  const handleOnSearchChange = async event => {
    const keyword = event.target.value;

    if (keyword) {
      try {
        setState({ searchError: null, searchLoading: true, hasText: true });
        const result = await getSearchKeywords(event.target.value);
        setState({ searchResults: [...result.products], searchLoading: false });
      } catch (err) {
        setState({ searchLoading: false, searchError: err.message });
      }
    } else {
      setState({ searchResults: [], hasText: false, searchError: null });
    }
  };

  const listStyle = state.visible
    ? styles.search__visible
    : styles.search__hidden;

  const renderSearchLoading = () => {
    return (
      <div className={styles.loading__div}>
        <Loading text="Searching" />
      </div>
    );
  };

  const renderSearchError = () => {
    return (
      <div className={styles.empty__div}>
        <Icomoon icon="warning" color="#D2ABAE" size={50} />
        <span className={styles.not_found__text}>{searchError}</span>
      </div>
    );
  };

  const renderEmptyList = () => {
    return (
      <div className={styles.empty__div}>
        <Icomoon
          icon={hasText ? 'notification' : 'pencil'}
          color="#D2ABAE"
          size={50}
        />
        <span className={styles.not_found__text}>
          {hasText ? 'No products found' : 'Enter keyword to search'}
        </span>
      </div>
    );
  };

  const renderSearchList = () => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={searchResults}
        style={{ padding: '5px' }}
        renderItem={item => (
          <List.Item
            style={{ padding: '10px' }}
            onClick={() => {
              console.log(item.id);
            }}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={getImageUrl(item.thumbnail)}
                  size={80}
                  shape="square"
                />
              }
              title={<span className={styles.item__header}>{item.name}</span>}
              description={
                <div>
                  <Rate
                    defaultValue={item.avgRating}
                    disabled
                    style={{ fontSize: 15 }}
                    allowHalf
                  />
                </div>
              }
              style={{ justifyContent: 'center', alignItems: 'center' }}
            />
            <div className={styles.price__div}>{`$${item.price}`}</div>
          </List.Item>
        )}
      />
    );
  };

  const renderHeader = () => {
    return (
      <div className={styles.header__div}>
        <span className={styles.searchHeader}>
          Welcome to <span className={styles.fashion__text}>Fashion</span>
          <span className={styles.end__text}>ista!</span>
        </span>
        <div className={styles.searchBox}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search Product"
            onFocus={onFocusGain}
            onBlur={onFocusLoss}
            onChange={handleOnSearchChange}
          />
          <div className={styles.icon}>
            <Icomoon icon="search" color="#D2ABAE" size={20} />
          </div>
          <div className={listStyle}>
            {searchError
              ? renderSearchError()
              : searchLoading
              ? renderSearchLoading()
              : searchResults.length === 0
              ? renderEmptyList()
              : renderSearchList()}
          </div>
        </div>
      </div>
    );
  };
  return <div className={styles.main__div}>{renderHeader()}</div>;
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
