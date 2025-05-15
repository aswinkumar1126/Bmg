import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useImageSlider } from '../../../../context/imageSliderContext';
import LoadingSkeleton from '../../../../components/LoadingSkeleton';
import ErrorComponent from '../../../../components/ErrorComponent';
import './manageImageSlider.css';

const ManageImageSlider = () => {
    const {
        sliderImages,
        handleDeleteImage,
        handleUpdateImage,
        loading,
        error: contextError,
    } = useImageSlider();

    const [error, setError] = useState(null);
    const [editId, setEditId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        title: '',
        description: '',
        imageFile: null,
        previewUrl: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const startEdit = (img) => {
        setEditId(img.id);
        setEditFormData({
            title: img.title || '',
            description: img.description || '',
            imageFile: null,
            previewUrl: img.image,
        });
    };

    const cancelEdit = () => {
        setEditId(null);
        setEditFormData({ title: '', description: '', imageFile: null, previewUrl: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setError('Image size should be less than 5MB');
                return;
            }
            if (!file.type.match('image.*')) {
                setError('Please select an image file');
                return;
            }

            setError(null);
            setEditFormData((prev) => ({
                ...prev,
                imageFile: file,
                previewUrl: URL.createObjectURL(file),
            }));
        }
    };

    const handleSave = async (id) => {
        setIsSubmitting(true);
        setError(null);

        try {
            await handleUpdateImage(
                id,
                editFormData.title,
                editFormData.description,
                editFormData.imageFile
            );
            cancelEdit();
        } catch (err) {
            setError(err.message || 'Failed to update image');
        } finally {
            setIsSubmitting(false);
        }
    };

    const confirmDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            try {
                await handleDeleteImage(id);
            } catch (err) {
                setError(err.message || 'Failed to delete image');
            }
        }
    };

    return (
        <motion.div
            className="manage-slider-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="header-section">
                <motion.h2
                    className="page-title"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    Manage Image Sliders
                </motion.h2>

                {(error || contextError) && (
                    <ErrorComponent
                        error={error || contextError}
                        onRetry={() => {
                            setError(null);
                            if (contextError) window.location.reload();
                        }}
                        onClose={() => setError(null)}
                    />
                )}
            </div>

            {loading ? (
                <LoadingSkeleton count={3} />
            ) : (
                <div className="table-responsive">
                    <table className="slider-table">
                        <thead>
                            <tr>
                                <th>Preview</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {sliderImages.length === 0 ? (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <td colSpan="4" className="empty-state">
                                            <div className="empty-content">
                                                <svg className="empty-icon" viewBox="0 0 24 24">
                                                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 12h2v5H7zm4-7h2v12h-2zm4 4h2v8h-2z" />
                                                </svg>
                                                <p>No sliders available</p>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ) : (
                                    sliderImages.map((img) => (
                                        <motion.tr
                                            key={img.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
                                        >
                                            <td>
                                                <div className="image-preview">
                                                    <img
                                                        src={editId === img.id && editFormData.previewUrl
                                                            ? editFormData.previewUrl
                                                            : img.image}
                                                        alt={img.title || 'Slider image'}
                                                        className="slider-image"
                                                    />
                                                    {editId === img.id && (
                                                        <div className="file-input-wrapper">
                                                            <input
                                                                type="file"
                                                                id={`file-${img.id}`}
                                                                accept="image/*"
                                                                onChange={handleFileChange}
                                                                className="file-input"
                                                            />
                                                            <label
                                                                htmlFor={`file-${img.id}`}
                                                                className="file-label"
                                                            >
                                                                Change Image
                                                            </label>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                {editId === img.id ? (
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        value={editFormData.title}
                                                        onChange={handleChange}
                                                        className="edit-input"
                                                        placeholder="Enter title"
                                                    />
                                                ) : (
                                                    <div className="text-content">
                                                        {img.title || <span className="no-value">No title</span>}
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                {editId === img.id ? (
                                                    <textarea
                                                        name="description"
                                                        value={editFormData.description}
                                                        onChange={handleChange}
                                                        className="edit-textarea"
                                                        placeholder="Enter description"
                                                        rows="2"
                                                    />
                                                ) : (
                                                    <div className="text-content">
                                                        {img.description || <span className="no-value">No description</span>}
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    {editId === img.id ? (
                                                        <>
                                                            <motion.button
                                                                onClick={() => handleSave(img.id)}
                                                                className="btn save"
                                                                disabled={isSubmitting}
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                            >
                                                                {isSubmitting ? 'Saving...' : 'Save'}
                                                            </motion.button>
                                                            <motion.button
                                                                onClick={cancelEdit}
                                                                className="btn cancel"
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                            >
                                                                Cancel
                                                            </motion.button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <motion.button
                                                                onClick={() => startEdit(img)}
                                                                className="btn edit"
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                            >
                                                                Edit
                                                            </motion.button>
                                                            <motion.button
                                                                onClick={() => confirmDelete(img.id)}
                                                                className="btn delete"
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                            >
                                                                Delete
                                                            </motion.button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            )}
        </motion.div>
    );
};

export default ManageImageSlider;