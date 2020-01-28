import React from 'react';
import { MdMenu } from 'react-icons/md';
import { AiOutlineShopping } from 'react-icons/ai';

import './DrawerToggleButton.css';

const DrawerToggleButton = props => {
  return (
    <button onClick={props.onClick} className="toggle-button">
      {props.isCart ? (
        <AiOutlineShopping color="gray" size={30} />
      ) : (
        <MdMenu color="gray" size={30} />
      )}
    </button>
  );
};

export default DrawerToggleButton;
