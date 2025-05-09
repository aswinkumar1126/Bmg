// src/layouts/LayoutWrapper.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './style/LayoutWrapper.css'; // optional for layout-specific styles

const LayoutWrapper = ({ children }) => {
    return (
        <div className="app-wrapper">
            <Header />
            <main className="content-area">{children}</main>
            <Footer />
        </div>
    );
};

export default LayoutWrapper;
