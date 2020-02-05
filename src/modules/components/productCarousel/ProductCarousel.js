import React from 'react';
import Slider from 'react-slick';

import { ProductCard, SliderButton } from '..';

import './ProductCarousel.css';
import styles from './ProductCarousel.module.css';

const ProductCarousel = props => {
  const { products, onProductClick } = props;

  const miniSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          swipeToSlide: true
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1,
          infinite: true,
          swipeToSlide: true
        }
      }
    ],
    prevArrow: <SliderButton isPrev />,
    nextArrow: <SliderButton />
  };
  const renderMiniCarousel = () => {
    const components = products.map(product => {
      return (
        <ProductCard
          item={product}
          key={product.id}
          onProductClick={onProductClick}
        />
      );
    });
    return <Slider {...miniSettings}>{components}</Slider>;
  };
  return (
    <div className={styles.main__div}>
      <div className={styles.header__div}>
        <span className={styles.separator} />
        <span className={styles.title__text}>
          <span className={styles.pink__text}>FEATURED</span> PRODUCTS
        </span>
        <span className={styles.separator} />
      </div>
      <div className={styles.carousel__div}>{renderMiniCarousel()}</div>
    </div>
  );
};

export default ProductCarousel;
