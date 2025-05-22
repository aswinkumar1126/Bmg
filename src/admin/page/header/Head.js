import React, { useState, useEffect, useContext } from 'react';
import { FiUser, FiLogOut,  FiMenu, FiX } from 'react-icons/fi';
import Logo from "../../../assets/images/header/weblogo.png"
import './Head.css';
import Search from '../../../components/Search';
import { ProfileContext } from '../../../context/ProfileContext';
import { NavLink, useLocation } from 'react-router-dom';
//FiKey,
const Head = ({ toggleSidebar, isSidebarOpen }) => {
    const { profile } = useContext(ProfileContext);
    const [profileOpen, setProfileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const scrollContainer = document.querySelector('.dashboard-content');
        const handleScroll = () => {
            const isScrolled = scrollContainer?.scrollTop > 10;
            setScrolled(isScrolled);
        };

        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll);
            handleScroll();
        }

        return () => {
            scrollContainer?.removeEventListener('scroll', handleScroll);
        };
    }, [location.pathname]);
    


    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`} >
            <div className="header-left">
                <div className="brand">
                    <img src={Logo} alt='logo' className="brand-icon"></img>
                    <span className="jewelry-name">BMG Jewellers</span>
                    <span className="jewelry-subtitle">Private Limited</span>
                </div>
                {profile?.name && !isMobile && (
                    <div className="user-greeting">
                        <span>Welcome, {profile.name}</span>
                    </div>
                )}
            </div>

        

            <div className="header-right">
                <div className="search-wrapper">
                    <Search />
                </div>
                
            </div>
            <div className="header-center">
                <button
                    className="hamburger"
                    onClick={toggleSidebar}
                    aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isSidebarOpen}
                >
                    {isSidebarOpen ? (
                        <FiX className="menu-icon" />
                    ) : (
                        <FiMenu className="menu-icon" />
                    )}
                </button>
                <div
                    className={`profile ${profileOpen ? 'active' : ''}`}
                    onClick={() => setProfileOpen(!profileOpen)}
                    onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget)) {
                            setProfileOpen(false);
                        }
                    }}
                    tabIndex={0}
                >
                    <div className="profile-icon">
                        <div className="avatar">
                            {profile?.name ? (
                                profile.name.charAt(0).toUpperCase()
                            ) : (
                                <FiUser />
                            )}
                        </div>
                    </div>
                    <div className={`profile-dropdown ${profileOpen ? 'open' : ''}`}>
                        <div className="dropdown-content">
                            {profile?.name && isMobile && (
                                <div className="mobile-profile-info">
                                    <div className="avatar large">
                                        {profile.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="profile-details">
                                        <h4>{profile.name}</h4>
                                        <p>{profile.email}</p>
                                    </div>
                                </div>
                            )}
                            <ul>
                                <NavLink to="/admin/profile"> <li> <FiUser className="dropdown-icon" /> <span>Profile</span> </li>
                                    
                                </NavLink>
                                <li>
                                    <FiLogOut className="dropdown-icon" />
                                    <span>Logout</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Head;