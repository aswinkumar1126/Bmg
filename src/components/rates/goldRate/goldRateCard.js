import React from 'react';
import { FaRupeeSign } from 'react-icons/fa';
import './goldRateCard.css';

const GoldRateCard = ({ rate }) => {
    return (
        <div className="gold-rate-card">
            <span className="metal-name">Gold</span>
            <div className="rate-value">
                <FaRupeeSign className="rupee-icon" />
                {rate.toLocaleString('en-IN')}/gm
            </div>
        </div>
    );
};

export default GoldRateCard;