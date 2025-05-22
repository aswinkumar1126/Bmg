import React, { useEffect, useState } from 'react';
import { FaRupeeSign } from 'react-icons/fa';
import usePrevious from '../previousRate/usePrevious';
import './SilverRateCard.css';

const SilverRateCard = ({ rate }) => {
    const previousRate = usePrevious(rate);
    const [animationClass, setAnimationClass] = useState('');
    const [rateColor, setRateColor] = useState('neutral');

    useEffect(() => {
        if (previousRate !== undefined) {
            if (rate > previousRate) {
                setRateColor('up');
            } else if (rate < previousRate) {
                setRateColor('down');
            } else {
                setRateColor('neutral');
            }
            setAnimationClass('rate-change');
            const timer = setTimeout(() => setAnimationClass(''), 500);
            return () => clearTimeout(timer);
        }
    }, [rate, previousRate]);

    return (
        <div className="rate-card silver-gradient">
            <span className="metal-name">🥈 Silver</span>
            <div className={`rate-value ${animationClass} ${rateColor}`}>
                <FaRupeeSign className="rupee-icon" />
                {rate.toLocaleString()}/gm
            </div>
        </div>
    );
};

export default SilverRateCard;
