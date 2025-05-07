import { Link } from 'react-router-dom';
import Logo from '../assets/header/logo.png';
import Search from './Search';
import React, { useEffect, useState } from 'react';
import './style/Header.css';
import {
    FaShoppingCart, FaMapMarkerAlt, FaPhone, FaEnvelope,
    FaUser, FaBoxOpen, FaChevronDown, FaBars, FaTimes
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
    const  { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        const handleResize = () => {
            setIsMobile(window.innerWidth < 992);
            if (window.innerWidth >= 992) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleDropdown = (menu) => {
        if (isMobile) {
            setActiveDropdown(activeDropdown === menu ? null : menu);
        } else {
            setActiveDropdown(menu);
        }
    };

    const closeDropdown = () => {
        if (!isMobile) {
            setActiveDropdown(null);
        }
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
                <div className="top-bar-content">
                    <div className="top-contact-info">
                        

                        <div className="contact-items">
                            <motion.a href="tel:+91-7094670946" className="contact-item" whileHover={{ x: 3 }}>
                                <FaPhone /> +91-7094670946
                            </motion.a>
                            <motion.a href="mailto:websupport@justdial.com" className="contact-item" whileHover={{ x: 3 }}>
                                <FaEnvelope /> websupport@justdial.com
                            </motion.a>
                        </div>
                    </div>

                    <div className="top-social-links">
                        <motion.span className="location" whileHover={{ x: 3 }}>
                            <FaMapMarkerAlt /> Chennai
                        </motion.span>

                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Link to="/track-order" className="track-order">
                                <FaBoxOpen /> Track Order
                            </Link>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link to="/login" className="login-btn">
                                <FaUser /> Log In | Sign Up
                            </Link>
                        </motion.div>
                        <div className="header-actions">
                            {/* Theme Toggle Button */}
                            <motion.button
                                className="theme-toggle"
                                onClick={toggleTheme}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label={`Toggle ${theme === 'light' ? 'dark' : 'light'} mode`}
                            >
                                {theme === 'light' ? (
                                    <FaMoon className="theme-icon" />
                                ) : (
                                    <FaSun className="theme-icon" style={{ color: '#FFD700' }} />
                                )}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="main-header">
                <div className="main-header-content">
                    <motion.div
                        className="logo-container"
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <motion.img
                            src={Logo}
                            alt="BMJ Jewellers Logo"
                            loading="lazy"
                            className="logo-img"
                            whileHover={{ rotate: -5 }}
                            transition={{ type: 'spring', damping: 10 }}
                        />
                        <Link to="/" className="logo-text">
                            <pre>BMG Jewellers {'\n'}<span className='sub-logotext'>Private Limited</span></pre>
                        </Link>
                    </motion.div>

                    <div className="search-bar-wrapper">
                        <Search />
                    </div>

                    <div className="header-actions">
                        <motion.div
                            className="cart-container"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link to="/cart" className="cart-button" aria-label="Shopping Cart">
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

                        <button
                            className="mobile-menu-toggle"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle Menu"
                        >
                            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                <ul className="nav-list">
                    {navItems.map((item) => (
                        <li
                            key={item.name}
                            onMouseEnter={() => !isMobile && toggleDropdown(item.name)}
                            onMouseLeave={() => !isMobile && closeDropdown()}
                        >
                            <Link
                                to={item.path}
                                onClick={() => {
                                    if (isMobile && !item.submenu) {
                                        setIsMobileMenuOpen(false);
                                    }
                                    if (isMobile && item.submenu) {
                                        toggleDropdown(item.name);
                                    }
                                }}
                            >
                                {item.name}
                                {item.submenu && <FaChevronDown className="dropdown-arrow" />}
                                <span className="nav-hover-indicator"></span>
                            </Link>

                            {item.submenu && (
                                <AnimatePresence>
                                    {(activeDropdown === item.name || (isMobileMenuOpen && isMobile)) && (
                                        <motion.ul
                                            className="dropdown-menu"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {item.submenu.map((subItem) => (
                                                <motion.li
                                                    key={subItem}
                                                    whileHover={{ x: 5 }}
                                                    onClick={() => setIsMobileMenuOpen(false)}
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