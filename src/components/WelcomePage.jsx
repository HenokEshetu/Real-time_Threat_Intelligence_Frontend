import React from 'react';
import { Link } from 'react-router-dom'; // Use dynamic navigation
import { motion } from 'framer-motion'; // For animations
import './WelcomePage.scss'; // SCSS styling

function WelcomePage() {
  const isAuthenticated = false; // Replace with actual auth logic

  return (
    <div className="welcome-page">
      {/* Header Section */}
      <header className="header">
        <div className="logo">
          <Link to="/">Threat Intelligence</Link>
        </div>
        <nav className="nav">
          <Link to="/">Home</Link>
          {!isAuthenticated && <Link to="/login">Sign In</Link>}
          {!isAuthenticated && <Link to="/signup">Sign Up</Link>}
          {isAuthenticated && <Link to="/dashboard">Dashboard</Link>}
          <Link to="/admin">Admin Sign In</Link>
        </nav>
      </header>

      {/* Hero Section with Animation */}
      <motion.main
        className="hero"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>Welcome to Real-Time Threat Intelligence</h1>
        <p>Your platform for comprehensive threat analysis and intelligence.</p>
        <motion.button
          className="explore-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore
        </motion.button>
      </motion.main>

      {/* Footer Section */}
      <footer className="footer">
        <p>© 2024 Threat Intelligence. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default WelcomePage;
