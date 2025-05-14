import React, { useState, useContext } from 'react';
import { useRate } from '../../../../context/RateContext';
import { ProfileContext } from '../../../../context/ProfileContext';
import { FaCoins, FaUserEdit, FaWeightHanging, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import './AddRate.css';

const AddRate = () => {
    const { addRate } = useRate();
    const [goldRate, setGoldRate] = useState('');
    const [silverRate, setSilverRate] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { profile } = useContext(ProfileContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!goldRate || !silverRate) {
            setError('Both gold rate and silver rate are required.');
            setSuccess('');
            return;
        }

        const newRate = {
            goldRate,
            silverRate,
            createdBy: profile.name
        };

        addRate(newRate)
            .then(() => {
                setSuccess('Rate added successfully!');
                setGoldRate('');
                setSilverRate('');
                setError('');
                // Clear success message after 3 seconds
                setTimeout(() => setSuccess(''), 3000);
            })
            .catch(() => {
                setError('Failed to add rate. Please try again.');
                setSuccess('');
            });
    };

    return (
        <div className="add-rate-container">
            <div className="add-rate-card">
                <h2 className="add-rate-title">
                    <FaCoins className="title-icon" /> Add New Rate
                </h2>
                <form className="add-rate-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="add-rate-label">
                            <FaWeightHanging className="input-icon" /> Gold Rate (per gram):
                        </label>
                        <input
                            type="number"
                            value={goldRate}
                            onChange={(e) => setGoldRate(e.target.value)}
                            placeholder="Enter gold rate"
                            className="add-rate-input"
                            step="0.01"
                            min="0"
                        />
                    </div>
                    <div className="input-group">
                        <label className="add-rate-label">
                            <FaWeightHanging className="input-icon" /> Silver Rate (per gram):
                        </label>
                        <input
                            type="number"
                            value={silverRate}
                            onChange={(e) => setSilverRate(e.target.value)}
                            placeholder="Enter silver rate"
                            className="add-rate-input"
                            step="0.01"
                            min="0"
                        />
                    </div>
                    <div className="input-group">
                        <label className="add-rate-label">
                            <FaUserEdit className="input-icon" /> Created By:
                        </label>
                        <input
                            type="text"
                            value={profile.name}
                            className="add-rate-input"
                            readOnly
                        />
                    </div>
                    {error && (
                        <div className="add-rate-message error">
                            <FaExclamationCircle className="message-icon" /> {error}
                        </div>
                    )}
                    {success && (
                        <div className="add-rate-message success">
                            <FaCheckCircle className="message-icon" /> {success}
                        </div>
                    )}
                    <button type="submit" className="add-rate-button">
                        Add Rate
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddRate;