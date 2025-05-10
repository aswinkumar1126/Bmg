import React from "react";
import "./style/LoadingSkeleton.css";

function LoadingSkeleton({ count = 1 }) {
    return (
        <>
            {Array(count).fill().map((_, index) => (
                <div className="product-card skeleton" key={index}>
                    <div className="image-container skeleton-image"></div>
                    <div className="product-info">
                        <div className="skeleton-line" style={{ width: '80%' }}></div>
                        <div className="skeleton-line" style={{ width: '60%' }}></div>
                        <div className="product-actions">
                            <div className="skeleton-button"></div>
                            <div className="skeleton-button" style={{ width: '40px' }}></div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default LoadingSkeleton;