import React, { useState } from 'react';
import { useRate } from '../../../context/RateContext';
import { FaEdit, FaSave, FaTimes, FaCoins, FaUser, FaHistory, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import './ManageRate.css';

const ManageRate = () => {
    const { rates, updateRate, error: contextError, loading: contextLoading, fetchRates } = useRate();
    const [editingId, setEditingId] = useState(null);
    const [editedGoldRate, setEditedGoldRate] = useState('');
    const [editedSilverRate, setEditedSilverRate] = useState('');
    const [localError, setLocalError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleEdit = (rate) => {
        setEditingId(rate.id);
        setEditedGoldRate(rate.goldRate);
        setEditedSilverRate(rate.silverRate);
        setLocalError('');
        setSuccess('');
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditedGoldRate('');
        setEditedSilverRate('');
        setLocalError('');
        setSuccess('');
    };

    const handleSave = async (id) => {
        if (!editedGoldRate || !editedSilverRate) {
            setLocalError('Both gold and silver rates are required.');
            return;
        }

        if (isNaN(editedGoldRate) || isNaN(editedSilverRate)) {
            setLocalError('Please enter valid numbers for rates');
            return;
        }

        setIsSubmitting(true);
        setLocalError('');
        setSuccess('');

        try {
            await updateRate(id, {
                goldRate: parseFloat(editedGoldRate),
                silverRate: parseFloat(editedSilverRate),
                createdBy: rates.find((rate) => rate.id === id).createdBy,
            });

            await fetchRates();
            setSuccess('Rates updated successfully!');
            setTimeout(() => {
                setEditingId(null);
                setSuccess('');
            }, 1500);
        } catch (err) {
            setLocalError('Failed to update rates. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };

    return (
        <div className="manage-rate-container">
            <div className="rate-header">
                <h2>Manage Rates</h2>
                <p className="rate-subtitle">Update current gold and silver rates</p>
            </div>

            <div className="table-container">
                <table className="rate-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>
                                <span className="rate-type">
                                    <FaCoins className="rate-icon gold" /> Gold Rate
                                </span>
                            </th>
                            <th>
                                <span className="rate-type">
                                    <FaCoins className="rate-icon silver" /> Silver Rate
                                </span>
                            </th>
                            <th>
                                <span className="rate-type">
                                    <FaUser className="rate-icon" /> Created By
                                </span>
                            </th>
                            <th>
                                <span className="rate-type">
                                    <FaHistory className="rate-icon" /> Created At
                                </span>
                            </th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contextLoading && rates.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="loading-row">
                                    <div className="loading-content">
                                        <div className="spinner"></div>
                                        <p>Loading rates...</p>
                                    </div>
                                </td>
                            </tr>
                        ) : rates && rates.length > 0 ? (
                            rates.map((rate) => (
                                <tr key={rate.id} className={editingId === rate.id ? 'editing-row' : ''}>
                                    <td data-label="ID">{rate.id}</td>
                                    <td data-label="Gold Rate">
                                        {editingId === rate.id ? (
                                            <div className="rate-input-container">
                                                <FaCoins className="input-icon gold" />
                                                <input
                                                    type="number"
                                                    value={editedGoldRate}
                                                    onChange={(e) => setEditedGoldRate(e.target.value)}
                                                    className="rate-input"
                                                    disabled={isSubmitting}
                                                    step="0.01"
                                                    min="0"
                                                    placeholder="Gold rate"
                                                />
                                            </div>
                                        ) : (
                                            <div className="rate-value-container">
                                                <FaCoins className="value-icon gold" />
                                                <span className="rate-value">{formatCurrency(rate.goldRate)}</span>
                                            </div>
                                        )}
                                    </td>
                                    <td data-label="Silver Rate">
                                        {editingId === rate.id ? (
                                            <div className="rate-input-container">
                                                <FaCoins className="input-icon silver" />
                                                <input
                                                    type="number"
                                                    value={editedSilverRate}
                                                    onChange={(e) => setEditedSilverRate(e.target.value)}
                                                    className="rate-input"
                                                    disabled={isSubmitting}
                                                    step="0.01"
                                                    min="0"
                                                    placeholder="Silver rate"
                                                />
                                            </div>
                                        ) : (
                                            <div className="rate-value-container">
                                                <FaCoins className="value-icon silver" />
                                                <span className="rate-value">{formatCurrency(rate.silverRate)}</span>
                                            </div>
                                        )}
                                    </td>
                                    <td data-label="Created By">
                                        <div className="created-by">
                                            <FaUser className="user-icon" />
                                            <span>{rate.createdBy || 'N/A'}</span>
                                        </div>
                                    </td>
                                    <td data-label="Created At">
                                        <div className="created-at">
                                            <FaHistory className="history-icon" />
                                            <span>{rate.createdAt ? new Date(rate.createdAt).toLocaleString() : 'N/A'}</span>
                                        </div>
                                    </td>
                                    <td data-label="Action">
                                        {editingId === rate.id ? (
                                            <div className="action-buttons">
                                                <button
                                                    className="save-btn"
                                                    onClick={() => handleSave(rate.id)}
                                                    disabled={isSubmitting || contextLoading}
                                                >
                                                    {isSubmitting ? (
                                                        <div className="spinner"></div>
                                                    ) : (
                                                        <>
                                                            <FaSave className="btn-icon" /> Save
                                                        </>
                                                    )}
                                                </button>
                                                <button
                                                    className="cancel-btn"
                                                    onClick={handleCancel}
                                                    disabled={isSubmitting || contextLoading}
                                                >
                                                    <FaTimes className="btn-icon" /> Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                className="edit-btn"
                                                onClick={() => handleEdit(rate)}
                                                disabled={editingId !== null || contextLoading}
                                            >
                                                <FaEdit className="btn-icon" /> Edit
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="no-data">
                                    <div className="no-data-content">
                                        <div className="no-data-icon">📊</div>
                                        <p>No rates found</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {(localError || contextError) && (
                <div className="notification error-message slide-in">
                    <FaExclamationCircle className="notification-icon" />
                    <span className="notification-text">{localError || contextError}</span>
                    <button
                        className="close-btn"
                        onClick={() => {
                            setLocalError('');
                            if (contextError) fetchRates();
                        }}
                    >
                        <FaTimes />
                    </button>
                </div>
            )}

            {success && (
                <div className="notification success-message slide-in">
                    <FaCheckCircle className="notification-icon" />
                    <span className="notification-text">{success}</span>
                </div>
            )}
        </div>
    );
};

export default ManageRate;