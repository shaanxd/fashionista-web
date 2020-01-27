import React from 'react';
import { MdMenu } from 'react-icons/md';

import './DrawerToggleButton.css';

const DrawerToggleButton = props => {
  return (
    <button onClick={props.onClick} className="toggle-button">
      <MdMenu color="gray" size={30} />
    </button>
  );
};

export default DrawerToggleButton;
