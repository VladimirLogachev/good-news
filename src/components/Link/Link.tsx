import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './Link.css';

type Props = {
  disabled: boolean;
  children: React.ReactNode;
  to: string;
};

export const Link = ({ disabled, children, to }: Props) => (
  <React.Fragment>
    {disabled ? (
      <span className="link disabled">{children}</span>
    ) : (
      <NavLink className="link" to={to}>
        {children}
      </NavLink>
    )}
  </React.Fragment>
);
