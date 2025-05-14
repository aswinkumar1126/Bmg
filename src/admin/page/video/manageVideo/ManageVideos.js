import React, { useEffect, useState } from 'react';
import { useVideo } from '../../../../context/videoContext';
import { FaEdit, FaSave, FaTimes, FaTrashAlt, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import styles from './ManageVideos.module.css';

const ManageVideo = () => {
    const { videos, updateVideo, deleteVideo, loading, error, getAllVideos } = useVideo();
    const [editingId, setEditingId] = useState(null);
    const [editedVideoName, setEditedVideoName] = useState('');
    const [localError, setLocalError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        getAllVideos();
    }, [getAllVideos]);

    const handleEdit = (video) => {
        setEditingId(video.id);
        setEditedVideoName(video.videoName);
        setLocalError('');
        setSuccess('');
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditedVideoName('');
        setLocalError('');
        setSuccess('');
    };

    const handleSave = async (id) => {
        if (!editedVideoName.trim()) {
            setLocalError('Video name is required');
            return;
        }

        setIsSubmitting(true);
        setLocalError('');
        setSuccess('');

        try {
            await updateVideo(id, editedVideoName, videos.find(v => v.id === id).url);
            setSuccess('Video updated successfully');
            setTimeout(() => {
                setEditingId(null);
                setSuccess('');
            }, 2000);
        } catch (err) {
            setLocalError(err.message || 'Failed to update video');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this video?')) {
            try {
                await deleteVideo(id);
                setSuccess('Video deleted successfully');
                setTimeout(() => setSuccess(''), 2000);
            } catch (err) {
                setLocalError(err.message || 'Failed to delete video');
            }
        }
    };

    const formatUrl = (url) => {
        if (!url) return '';
        if (url.length > 40) {
            return `${url.substring(0, 20)}...${url.substring(url.length - 20)}`;
        }
        return url;
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.heading}>
                    <span className={styles.headingHighlight}>Video Management</span>
                </h2>
                <p className={styles.subHeading}>Manage your video content library</p>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.idColumn}>ID</th>
                            <th className={styles.nameColumn}>Video Name</th>
                            <th className={styles.urlColumn}>URL</th>
                            <th className={styles.actionsColumn}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="4" className={styles.loadingRow}>
                                    <div className={styles.loadingContent}>
                                        <div className={styles.spinner}></div>
                                        <p>Loading videos...</p>
                                    </div>
                                </td>
                            </tr>
                        ) : videos && videos.length > 0 ? (
                            videos.map((video) => (
                                <tr
                                    key={video.id}
                                    className={`${styles.videoRow} ${editingId === video.id ? styles.editingRow : ''}`}
                                >
                                    <td className={styles.idCell}>{video.id}</td>
                                    <td className={styles.nameCell}>
                                        {editingId === video.id ? (
                                            <input
                                                type="text"
                                                value={editedVideoName}
                                                onChange={(e) => setEditedVideoName(e.target.value)}
                                                disabled={isSubmitting}
                                                className={styles.editInput}
                                                placeholder="Video name"
                                            />
                                        ) : (
                                            <span className={styles.videoName}>{video.videoName}</span>
                                        )}
                                    </td>
                                    <td className={styles.urlCell}>
                                        <a
                                            href={video.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.urlLink}
                                            title={video.url}
                                        >
                                            {formatUrl(video.url)}
                                        </a>
                                    </td>
                                    <td className={styles.actionsCell}>
                                        {editingId === video.id ? (
                                            <div className={styles.actionButtons}>
                                                <button
                                                    className={`${styles.actionButton} ${styles.saveButton}`}
                                                    onClick={() => handleSave(video.id)}
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? (
                                                        <div className={styles.buttonSpinner}></div>
                                                    ) : (
                                                        <>
                                                            <FaSave className={styles.buttonIcon} />
                                                            <span>Save</span>
                                                        </>
                                                    )}
                                                </button>
                                                <button
                                                    className={`${styles.actionButton} ${styles.cancelButton}`}
                                                    onClick={handleCancel}
                                                    disabled={isSubmitting}
                                                >
                                                    <FaTimes className={styles.buttonIcon} />
                                                    <span>Cancel</span>
                                                </button>
                                            </div>
                                        ) : (
                                            <div className={styles.actionButtons}>
                                                <button
                                                    className={`${styles.actionButton} ${styles.editButton}`}
                                                    onClick={() => handleEdit(video)}
                                                    disabled={editingId !== null}
                                                >
                                                    <FaEdit className={styles.buttonIcon} />
                                                    <span>Edit</span>
                                                </button>
                                                <button
                                                    className={`${styles.actionButton} ${styles.deleteButton}`}
                                                    onClick={() => handleDelete(video.id)}
                                                >
                                                    <FaTrashAlt className={styles.buttonIcon} />
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className={styles.noVideos}>
                                    <div className={styles.noVideosContent}>
                                        <div className={styles.noVideosIcon}>🎥</div>
                                        <p>No videos found in your library</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {(localError || error) && (
                <div className={`${styles.notification} ${styles.errorNotification} ${styles.slideIn}`}>
                    <FaExclamationCircle className={styles.notificationIcon} />
                    <span className={styles.notificationText}>{localError || error}</span>
                    <button
                        className={styles.closeButton}
                        onClick={() => setLocalError('')}
                        aria-label="Close error message"
                    >
                        <FaTimes />
                    </button>
                </div>
            )}

            {success && (
                <div className={`${styles.notification} ${styles.successNotification} ${styles.slideIn}`}>
                    <FaCheckCircle className={styles.notificationIcon} />
                    <span className={styles.notificationText}>{success}</span>
                </div>
            )}
        </div>
    );
};

export default ManageVideo;