import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';

export const Menu = () => (
  <div className="menu">
    <NavLink className="link" activeClassName="active" to="/feed">
      Feed
    </NavLink>
    <NavLink className="link" activeClassName="active" to="/favorites">
      Favorites
    </NavLink>
  </div>
);
