import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

const Header = () => {
  return (
    <>
      {/* Topbar */}
      <div className="topbar">
        <p>📞 +91 9876543210 | ✉️ support@freshpick.in</p>
      </div>

      {/* Navbar */}
      <header className="navbar">
        <div className="logo">FRESHPICK</div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/navigate">Navigate</Link>
          <Link to="/today_price">Market Price</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>
    </>
  );
};

export default Header;
