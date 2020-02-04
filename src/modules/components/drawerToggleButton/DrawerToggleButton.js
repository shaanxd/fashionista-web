import React from 'react';

import './DrawerToggleButton.css';

const DrawerToggleButton = props => {
  const { component: Component, onClick, value } = props;

  return (
    <button onClick={onClick} className="toggle-button">
      <Component color="gray" size={30} />
      {value && value > 0 ? (
        <span className="toggle-overlay">
          {`${value} `}
          {value === 1 ? 'item' : 'item'}
        </span>
      ) : null}
    </button>
  );
};

export default DrawerToggleButton;
