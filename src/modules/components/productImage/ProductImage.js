import React, { useRef } from 'react';
import Slider from 'react-slick';

import { getImageUrl } from '../../utils/productUtils';

import styles from './ProductImage.module.css';
import './ProductImage.css';

const ProductImage = props => {
  const largeRef = useRef(null);

  const largeSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false
  };

  const miniSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0
  };

  const { images, thumbnail } = props.product;

  const handleImageClick = index => {
    largeRef.current.slickGoTo(index);
  };

  const renderImageCarousel = () => {
    const withThumbnail = [thumbnail, ...images];
    const components = withThumbnail.map((image, index) => (
      <img
        key={index}
        className={styles.image}
        src={getImageUrl(image)}
        alt={image}
      />
    ));

    return (
      <Slider ref={largeRef} {...largeSettings}>
        {components}
      </Slider>
    );
  };

  const renderMiniCarousel = () => {
    const withThumbnail = [thumbnail, ...images];
    const components = withThumbnail.map((image, index) => (
      <div
        className={styles.image__div}
        onClick={() => {
          handleImageClick(index);
        }}
      >
        <img
          key={index}
          className={styles.image}
          src={getImageUrl(image)}
          alt={image}
        />
      </div>
    ));
    return <Slider {...miniSettings}>{components}</Slider>;
  };

  return (
    <div className={styles.carousel__div}>
      <div className={styles.large__div}>{renderImageCarousel()}</div>
      <div className={styles.select__div}>{renderMiniCarousel()}</div>
    </div>
  );
};

export default ProductImage;
