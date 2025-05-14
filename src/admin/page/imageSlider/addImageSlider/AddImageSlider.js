import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from '../../../api/axios';
import './AddImageSlider.css';

const AddImageSlider = () => {
    const [formData, setFormData] = useState({
        imageUrl: '',
        title: '',
        description: ''
    });
    const [message, setMessage] = useState({ text: '', type: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.imageUrl || !formData.title || !formData.description) {
            setMessage({ text: 'All fields are required.', type: 'error' });
            return;
        }

        setLoading(true);
        try {
            await axiosInstance.post('/slider/img-post', formData);
            setMessage({ text: 'Image slider added successfully!', type: 'success' });
            setFormData({ imageUrl: '', title: '', description: '' });
        } catch (error) {
            console.error(error);
            setMessage({ text: 'Failed to add image slider.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="add-slider-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="form-title">Add Image Slider</h2>
            <form className="slider-form" onSubmit={handleSubmit}>
                <motion.div
                    className="form-group"
                    
                    transition={{ type: 'spring', stiffness: 400 }}
                >
                    <label>
                        Image URL
                        <input
                            type="url"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            required
                        />
                    </label>
                </motion.div>

                <motion.div
                    className="form-group"
                   
                    transition={{ type: 'spring', stiffness: 400 }}
                >
                    <label>
                        Title
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter image title"
                            required
                        />
                    </label>
                </motion.div>

                <motion.div
                    className="form-group"
                    
                    transition={{ type: 'spring', stiffness: 400 }}
                >
                    <label>
                        Description
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter description"
                            required
                        />
                    </label>
                </motion.div>

                <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.03, boxShadow: '0 4px 12px rgba(0, 123, 255, 0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    className={`submit-btn ${loading ? 'loading' : ''}`}
                >
                    {loading ? (
                        <span className="loading-indicator">
                            <span className="spinner"></span>
                            Uploading...
                        </span>
                    ) : (
                        'Add Slider'
                    )}
                </motion.button>
            </form>

            {message.text && (
                <motion.div
                    className={`response-message ${message.type}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {message.text}
                </motion.div>
            )}
        </motion.div>
    );
};

export default AddImageSlider;