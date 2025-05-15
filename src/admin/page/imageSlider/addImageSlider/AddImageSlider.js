import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useImageSlider } from '../../../../context/imageSliderContext';
import './AddImageSlider.css';

const AddImageSlider = () => {
    const { handleAddImage } = useImageSlider();
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        file: null,
    });

    const [previewImage, setPreviewImage] = useState(null);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'file' && files && files[0]) {
            const file = files[0];
            setFormData(prev => ({ ...prev, file }));

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const removeImage = () => {
        setPreviewImage(null);
        setFormData(prev => ({ ...prev, file: null }));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, file } = formData;

        if (!title || !file) {
            setMessage({ text: 'Title and image are required', type: 'error' });
            return;
        }

        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            await handleAddImage(title, file);
            setMessage({ text: 'Image added successfully!', type: 'success' });
            setFormData({ title: '', description: '', file: null });
            setPreviewImage(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error) {
            console.error('Error adding image:', error);
            setMessage({ text: error.message || 'Failed to add image', type: 'error' });
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
            <div className="form-header">
                <h2 className="form-title">Add New Slider Image</h2>
                <p className="form-subtitle">Upload an image to display in the website slider</p>
            </div>

            <form className="slider-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title *</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter image title"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Optional image description"
                        rows="3"
                    />
                </div>

                <div className="form-group file-upload-group">
                    <label>Image *</label>
                    {previewImage ? (
                        <div className="image-preview-container">
                            <div className="image-preview-wrapper">
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="image-preview"
                                />
                                <button
                                    type="button"
                                    className="remove-image-btn"
                                    onClick={removeImage}
                                    aria-label="Remove image"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="file-upload-wrapper">
                            <input
                                ref={fileInputRef}
                                type="file"
                                name="file"
                                id="file"
                                accept="image/*"
                                onChange={handleChange}
                                required
                                className="file-input"
                            />
                            <label htmlFor="file" className="file-upload-label">
                                <div className="upload-content">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                                    </svg>
                                    <span>Choose an image</span>
                                </div>
                                <p className="file-requirements">JPEG, PNG (Max 5MB)</p>
                            </label>
                        </div>
                    )}
                </div>

                <div className="form-actions">
                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`submit-btn ${loading ? 'loading' : ''}`}
                    >
                        {loading ? (
                            <span className="loading-indicator">
                                <span className="spinner"></span> Uploading...
                            </span>
                        ) : (
                            'Add to Slider'
                        )}
                    </motion.button>
                </div>

                {message.text && (
                    <motion.div
                        className={`response-message ${message.type}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="message-content">
                            {message.type === 'success' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                </svg>
                            )}
                            <span>{message.text}</span>
                        </div>
                    </motion.div>
                )}
            </form>
        </motion.div>
    );
};

export default AddImageSlider;