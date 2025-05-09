import React from 'react';
import './style/CustomButton.css';

const CustomButton = ({
    label,
    onClick,
    type = 'button',
    disabled = false,
    className = '',
    variant = 'primary', // 'primary', 'secondary', or 'text'
    size = 'medium', // 'small', 'medium', 'large'
    icon = null, // Optional icon component
    isLoading = false
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`custom-button 
        ${variant} 
        ${size} 
        ${className} 
        ${disabled ? 'disabled' : ''}
        ${isLoading ? 'loading' : ''}`}
            aria-busy={isLoading}
        >
            {isLoading ? (
                <span className="button-loader"></span>
            ) : (
                <>
                    {icon && <span className="button-icon">{icon}</span>}
                    {label}
                </>
            )}
        </button>
    );
};

export default CustomButton;