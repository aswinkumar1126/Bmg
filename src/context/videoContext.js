// context/VideoContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';
import * as videoService from '../services/video/videoService';

export const VideoContext = createContext();
export const useVideo = () => useContext(VideoContext);

export const VideoProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const uploadVideo = useCallback(
        async (file, videoName) => {
            setLoading(true);
            setError(null);
            try {
                const videoUrl = await videoService.uploadVideo(file, videoName);
                return videoUrl;
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const updateVideo = useCallback(
        async (id, videoName, url) => {
            setLoading(true);
            setError(null);
            try {
                const updated = await videoService.updateVideo(id, videoName, url);
                return updated;
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const deleteVideo = useCallback(
        async (id) => {
            setLoading(true);
            setError(null);
            try {
                await videoService.deleteVideo(id);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        },
        []
    );

    return (
        <VideoContext.Provider
            value={{
                loading,
                error,
                uploadVideo,
                updateVideo,
                deleteVideo,
            }}
        >
            {children}
        </VideoContext.Provider>
    );
};
