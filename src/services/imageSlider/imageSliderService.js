import { axiosInstanceAdmin } from "../../api/axios";

export const getAllSliderImages = async () => {
    const res = await axiosInstanceAdmin.get('/slider/getAllImage');
    return res.data;
};

export const getSliderImageById = async (id) => {
    const res = await axiosInstanceAdmin.get(`slider/${id}`);
    return res.data;
};

export const addSliderImage = async (title, file) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    const res = await axiosInstanceAdmin.post('/img-post', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return res.data;
};

export const updateSliderImage = async (id, title, description, file) => {
    const formData = new FormData();
    if (title) formData.append('title', title);
    if (description) formData.append('description', description);
    if (file) formData.append('file', file);

    const res = await axiosInstanceAdmin.put(`slider/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return res.data;
};

export const deleteSliderImage = async (id) => {
    await axiosInstanceAdmin.delete(`slider/${id}`);
};
