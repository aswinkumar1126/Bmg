import { Link } from 'react-router-dom';
import Logo from '../assets/header/logo.png';
import Search from './Search';
import { ReactTyped } from 'react-typed';
import React, { useEffect, useState } from 'react';
import './style/Header.css';
import {
    FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn,
    FaShoppingCart, FaMapMarkerAlt, FaPhone, FaEnvelope,
    FaUser, FaBoxOpen, FaChevronDown
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDropdown = (menu) => {
        setActiveDropdown(activeDropdown === menu ? null : menu);
    };

    const navItems = [
        { name: 'HOME', path: '/' },
        {
            name: 'CATEGORY',
            path: '/category',
            submenu: ['Rings', 'Necklaces', 'Bracelets', 'Earrings']
        },
        { name: 'PRODUCTS', path: '/products' },
        { name: 'ABOUT US', path: '/about' },
        { name: 'WHY US', path: '/why-us' },
        { name: 'GALLERY', path: '/gallery' },
        { name: 'VIDEOS', path: '/videos' },
        { name: 'TESTIMONIALS', path: '/testimonials' },
        { name: 'CONTACT US', path: '/contact' }
    ];

    return (
        <header className={`header-container ${isScrolled ? 'scrolled' : ''}`}>
            {/* Top Bar */}
            <div className="top-bar">
                <div className="top-contact-info">
                    <div className="social-icons">
                        <motion.a
                            href="https://www.facebook.com"
                            whileHover={{ y: -2, color: '#1877F2' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaFacebookF />
                        </motion.a>
                        <motion.a
                            href="https://www.instagram.com"
                            whileHover={{ y: -2, color: '#E1306C' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaInstagram />
                        </motion.a>
                        <motion.a
                            href="https://www.twitter.com"
                            whileHover={{ y: -2, color: '#1DA1F2' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaTwitter />
                        </motion.a>
                        <motion.a
                            href="https://www.linkedin.com"
                            whileHover={{ y: -2, color: '#0077B5' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaLinkedinIn />
                        </motion.a>
                    </div>

                    <motion.div className="contact-items">
                        <motion.span
                            className="contact-item"
                            whileHover={{ x: 3 }}
                        >
                            <FaPhone /> +91-8888888888
                        </motion.span>
                        <motion.span
                            className="contact-item"
                            whileHover={{ x: 3 }}
                        >
                            <FaEnvelope /> websupport@justdial.com
                        </motion.span>
                    </motion.div>
                </div>

                <div className="top-social-links">
                    <motion.span
                        className="location"
                        whileHover={{ x: 3 }}
                    >
                        <FaMapMarkerAlt /> Malad West
                    </motion.span>

                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Link to="/track-order" className="track-order">
                            <FaBoxOpen /> Track Order
                        </Link>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link to="/login" className="login-btn">
                            <FaUser /> Log In | Sign Up
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Main Header */}
            <div className="main-header">
                <motion.div
                    className="logo-container"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    <motion.img
                        src={Logo}
                        alt="Logo"
                        loading="lazy"
                        className="logo-img"
                        whileHover={{ rotate: -5 }}
                        transition={{ type: 'spring', damping: 10 }}
                    />
                    <Link to="/" className="logo-text">
                        <ReactTyped
                            strings={['BMJ Jewellers']}
                            typeSpeed={50}
                            backSpeed={60}
                            loop
                            cursorChar=""
                            showCursor={false}
                        />
                    </Link>
                </motion.div>

                <div className="search-bar-wrapper">
                    <Search />
                </div>


                <motion.div
                    className="cart-container"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link to="/cart" className="cart-button">
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ repeat: Infinity, repeatDelay: 5, duration: 2 }}
                        >
                            <FaShoppingCart className="cart-icon" />
                        </motion.div>
                        <span className="cart-text">Cart</span>
                        <motion.span
                            className="cart-badge"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            0
                        </motion.span>
                    </Link>
                </motion.div>
            </div>
            {/* Mobile Menu Toggle Button */}
            <button
                className="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                ☰
            </button>

            {/* Navigation */}
            <nav className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                <ul className="nav-list">
                    {navItems.map((item) => (
                        <li
                            key={item.name}
                            onMouseEnter={() => toggleDropdown(item.name)}
                            onMouseLeave={() => toggleDropdown(null)}
                            onClick={() => toggleDropdown(item.name)}
                        >
                            <Link to={item.path}>
                                {item.name}
                                {item.submenu && <FaChevronDown className="dropdown-arrow" />}
                                <span className="nav-hover-indicator"></span>
                            </Link>

                            {item.submenu && (
                                <AnimatePresence>
                                    {activeDropdown === item.name && (
                                        <motion.ul
                                            className="dropdown-menu"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {item.submenu.map((subItem) => (
                                                <motion.li
                                                    key={subItem}
                                                    whileHover={{ x: 5 }}
                                                >
                                                    <Link to={`${item.path}/${subItem.toLowerCase()}`}>
                                                        {subItem}
                                                    </Link>
                                                </motion.li>
                                            ))}
                                        </motion.ul>
                                    )}
                                </AnimatePresence>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

export default Header;