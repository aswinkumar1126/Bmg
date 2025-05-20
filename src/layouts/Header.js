import { NavLink, Link, useLocation } from 'react-router-dom';
import Logo from '../assets/images/header/weblogo.png';
import Search from '../components/Search';
import React, { useEffect, useState } from 'react';
import './style/Header.css';
import {
    FaShoppingCart, FaChevronDown, FaBars, FaTimes
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
// import { useTheme } from '../context/ThemeContext';
// import { FaMoon, FaSun } from 'react-icons/fa';


function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
    const location = useLocation();


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

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [location.pathname]);

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

    // Check if a nav item is active
    const isActive = (path, submenu = []) => {
        const currentPath = location.pathname;

        // Check exact match for non-category paths
        if (!submenu.length) {
            return currentPath === path;
        }

        // For category pages, check if current path starts with the base path
        return currentPath.startsWith(path);
    };

    return (
        <header className={`header-container ${isScrolled ? 'scrolled' : ''}`}>
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
            <nav className={`nav-links ${isMobileMenuOpen ? 'active' : ''} ${isScrolled ? 'scrolled' : ''}`} >
                <ul className="nav-list">
                    {navItems.map((item) => (
                        <li
                            key={item.name}
                            onMouseEnter={() => !isMobile && toggleDropdown(item.name)}
                            onMouseLeave={() => !isMobile && closeDropdown()}
                            className={isActive(item.path, item.submenu) ? 'active-nav-item' : ''}
                        >
                            <NavLink
                                to={item.path}
                                end
                                onClick={() => {
                                    if (isMobile && !item.submenu) {
                                        setIsMobileMenuOpen(false);
                                    }
                                    if (isMobile && item.submenu) {
                                        toggleDropdown(item.name);
                                    }
                                }}
                                className={({ isActive }) =>
                                    isActive ? 'active-nav-link' : ''
                                }
                            >
                                {item.name}
                                {item.submenu && <FaChevronDown className="dropdown-arrow" />}
                                <span className="nav-hover-indicator"></span>
                            </NavLink>

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
                                                    <NavLink
                                                        to={`${item.path}/${subItem.toLowerCase()}`}
                                                        className={({ isActive }) =>
                                                            isActive ? 'active-subnav-link' : ''
                                                        }
                                                    >
                                                        {subItem}
                                                    </NavLink>
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