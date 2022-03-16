import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="navigation-container">
      <h1>YNAJ</h1>
      <nav className="nav-bar">
        <Link to="/applications" className="link">
          My applications
        </Link>
        <Link to="/search" className="link">
          Search Jobs
        </Link>
      </nav>
    </div>
  );
};

export default NavBar;
