import React, { createContext, useContext, useState, useCallback } from 'react';
import * as videoService from '../services/video/videoService';

export const VideoContext = createContext();
export const useVideo = () => useContext(VideoContext);

export const VideoProvider = ({ children }) => {
    const [videos, setVideos] = useState([]);
    const [latestVideo, setLatestVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAllVideos = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await videoService.getAllVideos();
            setVideos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const getLatestVideo = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await videoService.getLatestVideo();
            setLatestVideo(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const uploadVideo = useCallback(
        async (file, videoName) => {
            setLoading(true);
            setError(null);
            try {
                const videoUrl = await videoService.uploadVideo(file, videoName);
                setLatestVideo(videoUrl);
                await getAllVideos();
                return videoUrl;
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        },
        [getAllVideos]
    );

    const updateVideo = useCallback(
        async (id, videoName, url) => {
            setLoading(true);
            setError(null);
            try {
                const updated = await videoService.updateVideo(id, videoName, url);
                await getAllVideos();
                return updated;
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        },
        [getAllVideos]
    );

    const deleteVideo = useCallback(
        async (id) => {
            setLoading(true);
            setError(null);
            try {
                await videoService.deleteVideo(id);
                setVideos((prev) => prev.filter((video) => video.id !== id));
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
                videos,
                latestVideo,
                loading,
                error,
                getAllVideos,
                getLatestVideo,
                uploadVideo,
                updateVideo,
                deleteVideo,
            }}
        >
            {children}
        </VideoContext.Provider>
    );
};
