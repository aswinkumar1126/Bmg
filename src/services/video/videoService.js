import { axiosInstanceAdmin } from '../../api/axios';


const handleApiError = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
        return error.response.data.message;
    }
    return error.message || 'Unexpected error occurred';
};

export const getAllVideos = async () => {
    try {
        const response = await axiosInstanceAdmin.get('/cloudinary/all-videos');
        return response.data;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};

export const getLatestVideo = async () => {
    try {
        const response = await axiosInstanceAdmin.get('/cloudinary/video');
        return response.data;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};

export const uploadVideo = async (file, videoName) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('videoName', videoName);

        const response = await axiosInstanceAdmin.post('/cloudinary/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data; // videoUrl
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};

export const updateVideo = async (id, videoName, url) => {
    try {
        const response = await axiosInstanceAdmin.put(`/cloudinary/${id}`, { videoName, url });
        return response.data;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};

export const deleteVideo = async (id) => {
    try {
        const response = await axiosInstanceAdmin.delete(`/cloudinary/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};

