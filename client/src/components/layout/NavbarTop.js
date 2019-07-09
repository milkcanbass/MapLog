import React, { Fragment } from "react";
import "../css/NavbarTop.css";

const NavbarTop = props => {
  return (
    <Fragment>
      <header className="toolbar">
        <nav className="toolbar__navigation">
          <div />
          <div className="toolbar__logo">
            <a href="/">The Logo</a>
          </div>
          <div className="spacer" />
          <div className="toolbar_navigation-items">
            <ul>
              <li>
                <a href="#">Register</a>
              </li>
              <li>
                <a href="#">Users</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </Fragment>
  );
};

export default NavbarTop;
