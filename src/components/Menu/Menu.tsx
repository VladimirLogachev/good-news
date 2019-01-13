import * as React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

export const Menu = () => (
  <div>
    <Link to="/">Feed</Link>
    <Link to="/favorites">Favorites</Link>
  </div>
);
