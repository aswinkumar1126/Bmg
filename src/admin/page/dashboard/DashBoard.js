import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './DashBoard.css';
import Header from '../header/Head';
import Slider from '../slider/Slider';
import MainContent from '../main/MainContent';

const DashBoard = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 992);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const closeSidebar = () => {
        if (isMobile && sidebarVisible) {
            setSidebarVisible(false);
        }
    };

    // Show MainContent only if path is "/admin"
    const showMainContent = location.pathname === '/admin';

    return (
        <div className="app">
            <Header
                toggleSidebar={toggleSidebar}
                isSidebarOpen={sidebarVisible}
            />

            <Slider
                sidebarVisible={sidebarVisible}
                toggleSidebar={toggleSidebar}
                closeSidebar={closeSidebar}
               
            />

            {showMainContent && (
                <MainContent
                    sidebarVisible={sidebarVisible}
                    onClick={closeSidebar}
                   
                />
            )}
        </div>
    );
};

export default DashBoard;
