import React from "react";
import "./SilverRate.css";

const SilverRate = ({ rate }) => {
    return (
        <div className="silver-card">
            <div className="silver-border-glow" />
            <div className="silver-content">
                <span className="silver-icon">🪙</span>
                <span className="silver-label">Silver:</span>
                <span className="silver-rate">₹{rate?.toLocaleString() || "N/A"}</span>
            </div>
        </div>
    );
};

export default SilverRate;
