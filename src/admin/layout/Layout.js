import React, { useState, useEffect } from 'react';
import Header from "../page/header/Head";
import Slider from '../page/slider/Slider';
import { Outlet } from 'react-router-dom';
import './Layout.css'; // new CSS import

const Layout = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => setIsMobile(window.innerWidth < 992);
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const toggleSidebar = () => setSidebarVisible(!sidebarVisible);
    const closeSidebar = () => {
        if (isMobile && sidebarVisible) setSidebarVisible(false);
    };
    const closeBar = () => {
        if (sidebarVisible) setSidebarVisible(false);
    };

    return (
        <div className="app">
            <Header toggleSidebar={toggleSidebar} isSidebarOpen={sidebarVisible} />
            <Slider
                sidebarVisible={sidebarVisible}
                toggleSidebar={toggleSidebar}
                closeSidebar={closeSidebar}
                closeBar={closeBar}
            />
            <div className="main-content-layout" onClick={closeSidebar}>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
