import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from '../Link/Link';
import './Menu.css';

type Props = {};

const MenuComponent = ({ location }: RouteComponentProps<any> & Props) => (
  <div className="menu">
    <Link disabled={location.pathname === '/feed'} to="/feed">
      Feed
    </Link>
    <Link disabled={location.pathname === '/favorites'} to="/favorites">
      Favorites
    </Link>
  </div>
);

export const Menu = withRouter(MenuComponent);
