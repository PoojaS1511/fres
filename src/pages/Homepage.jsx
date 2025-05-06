// src/pages/Home.jsx
import React, { useState } from 'react';
import '../css//Homepage.css';
import { useNavigate } from 'react-router-dom';

export default function Homepage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleRegisterClick = () => {
    navigate('/signup');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to products page with search query
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };
  return (
    <>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Connecting Farmers to Local Markets</h1>
          <input
            type="text"
            placeholder="Search fresh products..."
            className="hero-search"
          />
         <button className="register-btn" onClick={handleRegisterClick}>Register Now</button>

        </div>
      </section>

      {/* Features Section (optional animations) */}
      <section className="features">
        <div className="feature-box">🌿 Connecting farmers, seamlessly</div>
        <div className="feature-box">📦 Empowering local markets</div>
        <div className="feature-box">🤝 Fresh produce, delivered.</div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 FreshPick Farmer Connect. All rights reserved.</p>
      </footer>
    </>
  );
}
