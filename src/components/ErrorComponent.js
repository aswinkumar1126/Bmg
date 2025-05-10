import React from "react";
import "./style/ErrorComponent.css";

function ErrorComponent({ error, onRetry }) {
    return (
        <div className="error-container">
            <div className="error-icon">!</div>
            <p>{error}</p>
            <button
                className="retry-button"
                onClick={onRetry || (() => window.location.reload())}
            >
                Retry
            </button>
        </div>
    );
}

export default ErrorComponent;