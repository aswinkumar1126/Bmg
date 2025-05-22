import React from 'react';
import './SilverRateCard.css';
import { FaRupeeSign } from 'react-icons/fa';

const SilverRateCard = ({ rate }) => {
    return (
        <div className="silver-rate-card">
            <span className="metal-name">Silver</span>
            <div className="rate-value">
                <FaRupeeSign className="rupee-icon" />
                {rate.toLocaleString()}/gm
            </div>
        </div>
    );
};

export default SilverRateCard;