import React, { useEffect } from 'react';

import styles from './Products.module.css';
import { withRouter } from 'react-router-dom';
import { useMergedState } from '../../utils/useMergedState';
import { getAllTags } from '../../api/product';

const Products = props => {
  const {
    history: {
      location: {
        state: { tag }
      }
    }
  } = props;

  const [state, setState] = useMergedState({
    tags: null,
    products: null,

    tagsLoading: true,
    tagsError: null
  });

  const { tagsLoading, tags } = state;

  useEffect(() => {
    loadTagsFromApi();
  }, []);

  const loadTagsFromApi = async (page = 0) => {
    try {
      if (!tagsLoading) {
        setState({ tagsLoading: true, tagsError: null });
      }
      const result = await getAllTags();
      setState({ tagsLoading: false, tags: { ...result } });
    } catch (err) {
      setState({ tagsLoading: false, tagsError: err.message });
    }
  };

  return <div className={styles.main__div}></div>;
};

export default withRouter(Products);
