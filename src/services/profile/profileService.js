// src/services/profileService.js

import { axiosInstanceAdmin } from "../../api/axios";

export const signupAdmin = async (adminData) => {
    const response = await axiosInstanceAdmin.post('/admin/signup', adminData);
    return response.data;
};

export const loginAdmin = async (mobileNumber, password) => {
    const response = await axiosInstanceAdmin.post('/admin/login', {
        mobileNumber,
        password,
    });
    return response.data;
};

export const getAllAdmins = async () => {
    const response = await axiosInstanceAdmin.get('/admin/getAllAdmin');
    return response.data;
};

export const getAdminById = async (id) => {
    try {
        const response = await axiosInstanceAdmin.get(`/admin/getAdmin/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
    }
};

// UPDATED updateAdmin to send multipart/form-data with JSON string + optional imageFile
export const updateAdmin = async (id, updatedData) => {
    const formData = new FormData();
    formData.append('admin', JSON.stringify(updatedData.admin));

    if (updatedData.imageFile) {
        formData.append('imageFile', updatedData.imageFile);
    }

    const response = await axiosInstanceAdmin.put(`/admin/modify/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};


export const deleteAdmin = async (id) => {
    const response = await axiosInstanceAdmin.delete(`/admin/delete/${id}`);
    return response.data;
};
