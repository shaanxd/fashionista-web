import React from 'react';
import { IoIosArrowDropright, IoIosArrowDropleft } from 'react-icons/io';

const SliderButton = props => {
  const { className, style, onClick, isPrev } = props;
  return (
    <div className={className} style={style} onClick={onClick}>
      {isPrev ? <IoIosArrowDropleft size={30} color="#F63854" /> : <IoIosArrowDropright size={30} color="#F63854" />}
    </div>
  );
};

export default SliderButton;
