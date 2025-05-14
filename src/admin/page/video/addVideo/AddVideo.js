import React, { useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../../../../api/axios";
import "./AddVideo.css";

const AddVideo = () => {
    const [video, setVideo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });
    const [progress, setProgress] = useState(0);

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type and size
            if (!file.type.includes("video/")) {
                setMessage({ text: "Please select a valid video file", type: "error" });
                return;
            }
            if (file.size > 100 * 1024 * 1024) { // 100MB limit
                setMessage({ text: "Video size should be less than 100MB", type: "error" });
                return;
            }
            setVideo(file);
            setMessage({ text: "", type: "" });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!video) {
            setMessage({ text: "Please select a video file first", type: "error" });
            return;
        }

        const formData = new FormData();
        formData.append("file", video);

        try {
            setIsLoading(true);
            setProgress(0);

            const response = await axiosInstance.post("/cloudinary/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setProgress(percentCompleted);
                },
            });

            setMessage({
                text: "Video uploaded successfully!",
                type: "success"
            });
            setVideo(null);

            // Clear success message after 5 seconds
            setTimeout(() => {
                setMessage({ text: "", type: "" });
            }, 5000);

            console.log("Upload successful", response.data);
        } catch (error) {
            console.error("Upload failed", error.response || error.message);
            setMessage({
                text: error.response?.data?.message || "Failed to upload video",
                type: "error"
            });
        } finally {
            setIsLoading(false);
            setProgress(0);
        }
    };

    return (
        <motion.div
            className="add-video-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="video-card"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h1 className="video-title">Upload Video</h1>
                <p className="video-subtitle">Select a video file to upload to your library</p>

                <form onSubmit={handleSubmit} className="video-form">
                    <div className="video-upload-container">
                        <input
                            type="file"
                            accept="video/*"
                            onChange={handleVideoChange}
                            id="video-file"
                            className="video-input"
                            disabled={isLoading}
                        />
                        <motion.label
                            htmlFor="video-file"
                            className="upload-label"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="upload-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="currentColor" />
                                    <path d="M14 2V8H20" fill="currentColor" />
                                    <path d="M12 18V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M9 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <span className="upload-text">
                                {video ? "Change Video" : "Select Video"}
                            </span>
                        </motion.label>

                        {video && (
                            <div className="file-info">
                                <p className="file-name">{video.name}</p>
                                <p className="file-size">
                                    {(video.size / (1024 * 1024)).toFixed(2)} MB
                                </p>
                            </div>
                        )}
                    </div>

                    {isLoading && (
                        <div className="progress-container">
                            <div
                                className="progress-bar"
                                style={{ width: `${progress}%` }}
                            ></div>
                            <span className="progress-text">{progress}%</span>
                        </div>
                    )}

                    <motion.button
                        type="submit"
                        className="submit-btn"
                        disabled={!video || isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isLoading ? (
                            <span className="btn-loading">
                                <span className="spinner"></span>
                                Uploading...
                            </span>
                        ) : (
                            "Upload Video"
                        )}
                    </motion.button>
                </form>

                {message.text && (
                    <motion.div
                        className={`alert-message ${message.type}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                    >
                        {message.text}
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default AddVideo;