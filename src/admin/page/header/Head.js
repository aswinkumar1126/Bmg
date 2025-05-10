import React, { useState, useEffect} from 'react';
import './Head.css';
import Search from '../../../components/Search';
import { ProfileContext } from '../../../context/ProfileContext';
const Head = ({ toggleSidebar, isSidebarOpen }) => {

    const { profile } = React.useContext(ProfileContext);
    console.log("Context profile:", profile);
    const [profileOpen, setProfileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="header-left">
                <span className="jewelry-name">BMG Jewellers Private Limited</span>

            </div>
            <div className="header-center">
                <button
                    className="hamburger"
                    onClick={toggleSidebar}
                    aria-label="Toggle menu"
                    aria-expanded={isSidebarOpen}
                >
                    <span className="hamburger-icon">
                        {isSidebarOpen ? '✕' : '☰'}
                    </span>
                </button>
            </div>
            <div className="header-right">
                <div className="search-wrapper">
                    <Search />
                </div>
                <div
                    className="profile"
                    onClick={() => setProfileOpen(!profileOpen)}
                    onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget)) {
                            setProfileOpen(false);
                        }
                    }}
                    tabIndex={0}
                >
                    <div className="profile-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                    <div className={`profile-dropdown ${profileOpen ? 'open' : ''}`}>
                        <ul>
                            <li>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                <span>Profile</span>
                            </li>
                            <li>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                    <polyline points="16 17 21 12 16 7"></polyline>
                                    <line x1="21" y1="12" x2="9" y2="12"></line>
                                </svg>
                                <span>Logout</span>
                            </li>
                            <li>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                                </svg>
                                <span>Change Password</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Head;