
import './MainContent.css';
import {
    FiUsers, FiShoppingCart, FiClock, FiTruck,
    FiX, FiStar, FiTrendingUp, FiPieChart,
    FiDollarSign, FiBarChart2, FiThumbsUp, FiAward
} from 'react-icons/fi';

const MainContent = ({ sidebarVisible, onClick }) => {
    const cards = [
        { title: "Total Users",  icon: <FiUsers />,  color: "var(--primary-color)" },
        { title: "Orders",  icon: <FiShoppingCart />, color: "var(--secondary-color)" },
        { title: "Pending",icon: <FiClock />,  color: "var(--warning-color)" },
        { title: "Delivered", icon: <FiTruck />, color: "var(--success-color)" },
        { title: "Cancelled",  icon: <FiX />,  color: "var(--danger-color)" },
        { title: "Review",  icon: <FiStar />, color: "var(--highlight-color)" }
    ];

    const charts = [
        { title: "Sales Overview", icon: <FiTrendingUp /> },
        { title: "Category Distribution", icon: <FiPieChart /> },
        { title: "Order Distribution", icon: <FiShoppingCart /> },
        { title: "Customer Feedback", icon: <FiThumbsUp /> },
        { title: "Revenue Trend", icon: <FiDollarSign /> },
        { title: "Monthly Revenue", icon: <FiBarChart2 /> },
        { title: "User Registration", icon: <FiUsers /> },
        { title: "Top Products", icon: <FiAward /> }
    ];

    return (
        <div
            className={`dashboard-content ${sidebarVisible ? 'sidebar-visible' : ''}`}
            onClick={onClick}
        >
            <div className="dashboard">
                {/* Dashboard Cards */}
                <div className="cards">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="card"
                            style={{ borderLeft: `4px solid ${card.color}` }}
                        >
                            <div className="card-icon" style={{ color: card.color }}>
                                {card.icon}
                            </div>
                            <div className="card-content">
                                <h3>{card.title}</h3>
                                <p className="card-value"></p>
                                <p className={`card-trend `}>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Section */}
                <h2 className="section-title">Analytics Dashboard</h2>
                <div className="charts">
                    {charts.map((chart, index) => (
                        <div
                            key={index}
                            className="chart"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className="chart-icon">{chart.icon}</div>
                            <h3>{chart.title}</h3>
                            <div className="chart-placeholder"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainContent;