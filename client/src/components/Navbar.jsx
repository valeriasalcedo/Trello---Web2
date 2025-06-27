import React from 'react';
import '../styles/Navbar.css';
import logo from '../assets/logo.png';
import LightButton from './LightButton'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="VÖR Logo" />
      </div>
      <ul className="navbar-links">
        <li><a href="#">Services</a></li>
        <li><a href="#">Options</a></li>
        <li><a href="#">Plans</a></li>
      </ul>
      <LightButton label="Login" />
    </nav>
  );
};

export default Navbar;
