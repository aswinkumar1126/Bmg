import React, { createContext, useContext, useState, useCallback } from 'react';
//import axiosInstanceAdmin from '../api/axios';
import axios from 'axios';
export const VideoContext = createContext();
export const useVideo = () => useContext(VideoContext);

export const VideoProvider = ({ children }) => {
    const [videos, setVideos] = useState([]);
    const [latestVideo, setLatestVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const baseURL = 'http://localhost:8081/api/v1';
    const getAllVideos = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${baseURL}/cloudinary/all-videos`);
            setVideos(response.data);
            console.log(response.data);
        } catch (err) {
            setError("Error fetching videos: " + err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const getLatestVideo = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${baseURL}/cloudinary/video`);
            setLatestVideo(response.data);
        } catch (err) {
            setError("Error fetching latest video: " + err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const uploadVideo = useCallback(async (file, videoName) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('videoName', videoName);

        try {
            const response = await axios.post(`${baseURL}/cloudinary/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            const videoUrl = response.data;
            setLatestVideo(videoUrl);
            await getAllVideos();
            return videoUrl;
        } catch (err) {
            setError("Error uploading video: " + err.message);
        } finally {
            setLoading(false);
        }
    }, [getAllVideos]);

    const updateVideo = useCallback(async (id, videoName, url) => {
        setLoading(true);
        try {
            const response = await axios.put(`${baseURL}/cloudinary/${id}`, { videoName, url });
            await getAllVideos();
            return response.data;
        } catch (err) {
            setError("Error updating video: " + err.message);
        } finally {
            setLoading(false);
        }
    }, [getAllVideos]);

    const deleteVideo = useCallback(async (id) => {
        setLoading(true);
        try {
            const response = await axios.delete(`${baseURL}/cloudinary/${id}`);
            setVideos(prev => prev.filter(video => video.id !== id));
            return response.data;
        } catch (err) {
            setError("Error deleting video: " + err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <VideoContext.Provider value={{
            videos,
            latestVideo,
            loading,
            error,
            getAllVideos,
            getLatestVideo,
            uploadVideo,
            updateVideo,
            deleteVideo,
        }}>
            {children}
        </VideoContext.Provider>
    );
};
