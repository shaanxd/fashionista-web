import React from 'react';
import { List, Rate } from 'antd';
import { AiOutlineSearch, AiOutlineWarning } from 'react-icons/ai';

import { Loading, Glitch } from '../';
import { useMergedState } from '../../utils/useMergedState';
import { getImageUrl } from '../../utils/productUtils';
import { getSearchKeywords } from '../../api/product';

import styles from './HomeSearch.module.css';

const HomeSearch = props => {
  const [state, setState] = useMergedState({
    searchResults: [],
    searchLoading: false,
    searchError: null,
    hasText: false
  });

  const { searchError, searchLoading, searchResults, hasText } = state;

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

  const renderSearchLoading = () => {
    return (
      <div className={styles.other__div}>
        <Loading text="Searching" />
      </div>
    );
  };

  const renderSearchError = () => {
    return (
      <div className={styles.other__div}>
        <Glitch text={searchError} icon={AiOutlineWarning} />
      </div>
    );
  };

  const renderEmptyList = () => {
    return (
      <div className={styles.other__div}>
        {hasText ? (
          <Glitch text="No products found" icon={AiOutlineWarning} />
        ) : (
          <Glitch text="Enter search term" icon={AiOutlineSearch} />
        )}
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
            style={{ padding: '10px', cursor: 'pointer' }}
            onClick={() => {
              props.navigate(`/product/${item.id}`);
            }}
          >
            <List.Item.Meta
              avatar={
                <img
                  src={getImageUrl(item.thumbnail)}
                  alt="thumbnail"
                  className={styles.thumbnail}
                />
              }
              title={<span className={styles.item__header}>{item.name}</span>}
              description={
                <div className={styles.rating__container}>
                  <Rate
                    style={{
                      color: '#e70887',
                      fontSize: 15
                    }}
                    defaultValue={0}
                    value={item.avgRating}
                    disabled
                    allowHalf
                  />
                </div>
              }
              style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}
            />
            <div className={styles.price__div}>{`$${item.price.toFixed(
              2
            )}`}</div>
          </List.Item>
        )}
      />
    );
  };

  return (
    <div className={styles.header__div}>
      <span className={styles.search__header}>
        Welcome to <span className={styles.fashion__text}>Fashion</span>ista!
      </span>
      <div className={styles.search__box}>
        <input
          type="text"
          className={styles.search__input}
          placeholder="Search Product"
          onChange={handleOnSearchChange}
        />
        <div className={styles.icon}>
          <AiOutlineSearch color="#009e93" size={30} />
        </div>
        <div className={styles.search__visible}>
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

export default HomeSearch;
