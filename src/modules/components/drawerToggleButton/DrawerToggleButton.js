import React from 'react';

import { Icomoon } from '..';

import './DrawerToggleButton.css';

const DrawerToggleButton = props => {
  return (
    <button onClick={props.onClick} className="toggle-button">
      <Icomoon icon="menu" color="black" size={25} />
    </button>
  );
};

export default DrawerToggleButton;
