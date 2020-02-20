import React from 'react';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';

const SliderButton = props => {
  const { className, style, onClick, isPrev } = props;
  return (
    <div className={className} style={style} onClick={onClick}>
      {isPrev ? <AiOutlineLeft size={25} color="#F63854" /> : <AiOutlineRight size={25} color="#F63854" />}
    </div>
  );
};

export default SliderButton;
