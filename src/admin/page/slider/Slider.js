import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Slider.css';
import {
  FiHome, FiGrid, FiLayers, FiImage, FiBox, FiAward,
  FiDollarSign, FiShoppingCart, FiStar, FiHelpCircle,
  FiPieChart, FiSearch, FiUsers, FiMail,
  FiChevronDown, FiChevronRight, FiPlus, FiList
} from 'react-icons/fi';

const Slider = ({ sidebarVisible, toggleSidebar }) => {
  const [expandedItems, setExpandedItems] = useState({});

  const menuItems = [
    { name: "Dashboard", icon: <FiHome />, hasSubItems: false },
    { name: "Categories", icon: <FiGrid />, hasSubItems: true },
    { name: "Sub-Categories", icon: <FiLayers />, hasSubItems: true },
    { name: "Offer & Banner", icon: <FiImage />, hasSubItems: true },
    { name: "Products", icon: <FiBox />, hasSubItems: true },
    { name: "Awards", icon: <FiAward />, hasSubItems: true },
    { name: "Rates", icon: <FiDollarSign />, hasSubItems: true },
    { name: "Orders", icon: <FiShoppingCart />, hasSubItems: false },
    { name: "Review", icon: <FiStar />, hasSubItems: false },
    { name: "Enquiry", icon: <FiHelpCircle />, hasSubItems: false },
    { name: "Report", icon: <FiPieChart />, hasSubItems: false },
    { name: "Search Order", icon: <FiSearch />, hasSubItems: false },
    { name: "Reg Users", icon: <FiUsers />, hasSubItems: false },
    { name: "Subscriber", icon: <FiMail />, hasSubItems: false }
  ];

  const toggleSubItems = (itemName) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`sidebar-overlay ${sidebarVisible ? 'active' : ''}`}
        onClick={toggleSidebar}
      />

      <div className={`slider ${sidebarVisible ? 'visible' : ''}`}>
        <div className="sidebar-header">
          <h3>BMG Jewellers</h3>
        </div>

        <div className="sidebar-content">
          <ul>
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                <li className={expandedItems[item.name] ? 'expanded' : ''}>
                  <div
                    className="menu-item-header"
                    onClick={() => item.hasSubItems && toggleSubItems(item.name)}
                  >
                    <span className="menu-icon">{item.icon}</span>
                    <span className="menu-text">{item.name}</span>
                    {item.hasSubItems && (
                      <span className="menu-arrow">
                        {expandedItems[item.name] ? <FiChevronDown /> : <FiChevronRight />}
                      </span>
                    )}
                    <span className="menu-hover-effect"></span>
                  </div>

                  {item.hasSubItems && expandedItems[item.name] && (
                    <ul className="submenu">
                      <li>
                        <NavLink to={`/${item.name.toLowerCase().replace(/\s+/g, '-')}/add`}>
                          <span className="submenu-icon"><FiPlus /></span>
                          <span>Add</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={`/${item.name.toLowerCase().replace(/\s+/g, '-')}/manage`}>
                          <span className="submenu-icon"><FiList /></span>
                          <span>Manage</span>
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Slider;