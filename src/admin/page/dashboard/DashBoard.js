import React, { useState, useEffect } from 'react';
import './DashBoard.css';
import Header from '../header/Head';
import Slider from '../slider/Slider';
import MainContent from '../main/MainContent';

const DashBoard = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

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

            <MainContent
                sidebarVisible={sidebarVisible}
                onClick={closeSidebar}
            />
        </div>
    );
};

export default DashBoard;