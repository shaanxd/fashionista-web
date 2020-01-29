import React from 'react';
import { MdMenu } from 'react-icons/md';
import { AiOutlineShoppingCart } from 'react-icons/ai';

import './DrawerToggleButton.css';

const DrawerToggleButton = props => {
  const renderHomeButton = () => (
    <button onClick={props.onClick} className="toggle-button">
      <MdMenu color="gray" size={30} />
    </button>
  );

  const renderCartButton = () => (
    <button onClick={props.onClick} className="toggle-button">
      {props.value && props.value > 0 ? (
        <span className="toggle-overlay">{props.value}</span>
      ) : null}
      <AiOutlineShoppingCart color="gray" size={30} />
    </button>
  );

  return props.isCart ? renderCartButton() : renderHomeButton();
};

export default DrawerToggleButton;
