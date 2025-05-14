import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Slider.css';
import {
  FiHome, FiImage, FiBox, FiAward, FiDollarSign,
  FiChevronDown, FiChevronRight, FiPlus, FiList
} from 'react-icons/fi';
// FiGrid, FiLayers,
const Slider = ({ sidebarVisible, toggleSidebar, closeSidebar, closeBar }) => {
  const [expandedItems, setExpandedItems] = useState({});

  const menuItems = [
    { name: "Dashboard", icon: <FiHome />, hasSubItems: false, path: "/admin" },
    // { name: "Categories", icon: <FiGrid />, hasSubItems: true },
    // { name: "Sub-Categories", icon: <FiLayers />, hasSubItems: true },
    { name: "Offer & Banner", icon: <FiImage />, hasSubItems: true },
    { name: "Products", icon: <FiBox />, hasSubItems: true },
    { name: "Videos", icon: <FiAward />, hasSubItems: true },
    { name: "Rates", icon: <FiDollarSign />, hasSubItems: true },
  ];

  const toggleSubItems = (itemName) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  //const formatPath = (name) => name.toLowerCase().replace(/\s+/g, '-');

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`sidebar-overlay ${sidebarVisible ? 'active' : ''}`}
        onClick={closeSidebar}
      />

      <div className={`slider ${sidebarVisible ? 'visible' : ''}`}>
        <div className="sidebar-header">
          <h3>BMG Jewellers</h3>
        </div>

        <div className="sidebar-content">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className={expandedItems[item.name] ? 'expanded' : ''}>
                <div
                  className="menu-item-header"
                  onClick={() => item.hasSubItems ? toggleSubItems(item.name) : toggleSidebar()}
                >
                  {item.hasSubItems ? (
                    <>
                      <span className="menu-icon">{item.icon}</span>
                      <span className="menu-text">{item.name}</span>
                      <span className="menu-arrow">
                        {expandedItems[item.name] ? <FiChevronDown /> : <FiChevronRight />}
                      </span>
                    </>
                  ) : (
                    <NavLink
                      to={item.path}
                      className="menu-link"
                      onClick={toggleSidebar}
                    >
                      <span className="menu-icon">{item.icon}</span>
                      <span className="menu-text">{item.name}</span>
                    </NavLink>
                  )}
                </div>

                {item.hasSubItems && expandedItems[item.name] && (
                  <ul className="submenu">
                    <li>
                      <NavLink to={`/admin/${item.name.toLowerCase().replace(/\s+/g, '-')}/add`}

                        onClick={toggleSidebar } 
                      >
                        <span className="submenu-icon"><FiPlus /></span>
                        <span>Add</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={`/admin/${item.name.toLowerCase().replace(/\s+/g, '-')}/manage`}
                        onClick={toggleSidebar}
                      >
                        <span className="submenu-icon"><FiList /></span>
                        <span>Manage</span>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Slider;
