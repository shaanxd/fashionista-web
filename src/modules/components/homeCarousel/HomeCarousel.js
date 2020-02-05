import React from 'react';
import Slider from 'react-slick';

import { ProductCard, SliderButton, CategoryItem } from '..';
import { CAROUSEL_TYPES } from '../../constants/types';

import './HomeCarousel.css';
import styles from './HomeCarousel.module.css';

const HomeCarousel = props => {
  const { items, onItemClick, leftHeader, rightHeader, type } = props;

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

  const renderProductCarousel = () => {
    const components = items.map(product => {
      return (
        <ProductCard
          item={product}
          key={product.id}
          onProductClick={onItemClick}
        />
      );
    });
    return <Slider {...miniSettings}>{components}</Slider>;
  };

  const renderBrandCarousel = () => {
    const components = items.map(tag => {
      return (
        <CategoryItem item={tag} key={tag.id} onCategoryClick={onItemClick} />
      );
    });
    return <Slider {...miniSettings}>{components}</Slider>;
  };

  return (
    <div className={styles.main__div}>
      <div className={styles.header__div}>
        <span className={styles.separator} />
        <span className={styles.title__text}>
          <span className={styles.pink__text}>{leftHeader}</span> {rightHeader}
        </span>
        <span className={styles.separator} />
      </div>
      <div className={styles.carousel__div}>
        {type === CAROUSEL_TYPES.PRODUCT
          ? renderProductCarousel()
          : renderBrandCarousel()}
      </div>
    </div>
  );
};

export default HomeCarousel;
