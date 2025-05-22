import { useState, useEffect } from 'react';
import { Breakpoints } from './breakpoints';

/**
 * Tracks window size and device type.
 * Handles SSR safely and throttles resize events.
 */
export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState(() => ({
        width: typeof window !== 'undefined' ? window.innerWidth : Breakpoints.desktop,
        height: typeof window !== 'undefined' ? window.innerHeight : 800,
        device: 'desktop', // Default for SSR
    }));

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = () => {
            const width = window.innerWidth;
            setWindowSize({
                width,
                height: window.innerHeight,
                device: getDeviceType(width),
            });
        };

        // Throttle for performance
        const throttledResize = throttle(handleResize, 200);
        window.addEventListener('resize', throttledResize);
        return () => window.removeEventListener('resize', throttledResize);
    }, []);

    return windowSize;
};

// Helper: Device detection
const getDeviceType = (width) => {
    if (width < Breakpoints.mobile) return 'mobile';
    if (width < Breakpoints.tablet) return 'tablet';
    if (width < Breakpoints.laptop) return 'laptop';
    return 'desktop';
};

// Helper: Simple throttle function
function throttle(fn, delay) {
    let lastCall = 0;
    return (...args) => {
        const now = Date.now();
        if (now - lastCall >= delay) {
            fn(...args);
            lastCall = now;
        }
    };
}