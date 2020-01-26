import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';

import { getImageUrl } from '../../utils/productUtils';

import styles from './ProductImage.module.css';
import './ProductImage.css';
import { useMergedState } from '../../utils/useMergedState';

const ProductImage = props => {
  const largeRef = useRef(null);
  const smallRef = useRef(null);

  const [state, setState] = useMergedState({
    current: 0,
    smallNav: null
  });

  useEffect(
    () => {
      setState({ smallNav: smallRef.current });
    },
    //eslint-disable-next-line
    []
  );

  const beforeChange = (current, next) => {
    setState({ current: next });
  };

  const largeSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    beforeChange
  };

  const miniSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0
  };

  const { images } = props;

  const handleImageClick = index => {
    largeRef.current.slickGoTo(index);
  };

  const renderImageCarousel = () => {
    const components = images.map((image, index) => (
      <img
        key={index}
        className={styles.image}
        src={getImageUrl(image)}
        alt={image}
      />
    ));

    return (
      <Slider ref={largeRef} asNavFor={state.smallNav} {...largeSettings}>
        {components}
      </Slider>
    );
  };

  const renderMiniCarousel = () => {
    const components = images.map((image, index) => {
      const style =
        index === state.current ? styles.selected__image : styles.image;

      return (
        <div
          className={styles.image__div}
          onClick={() => {
            handleImageClick(index);
          }}
        >
          <img
            key={index}
            className={style}
            src={getImageUrl(image)}
            alt={image}
          />
        </div>
      );
    });
    return (
      <Slider ref={smallRef} {...miniSettings}>
        {components}
      </Slider>
    );
  };

  return (
    <div className={styles.carousel__div}>
      <div className={styles.large__div}>{renderImageCarousel()}</div>
      <div className={styles.select__div}>{renderMiniCarousel()}</div>
    </div>
  );
};

export default ProductImage;
