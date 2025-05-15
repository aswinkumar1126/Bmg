import { axiosInstanceAdmin } from "../../api/axios";

export const signup = async ({ name, mobileNumber, password, secretKey }) => {
    const payload = { name, mobileNumber, password, secretKey };
    const response = await axiosInstanceAdmin.post('/admin/signup', payload);
    return response.data;
};

export const login = async ({ mobileNumber, password }) => {
    const payload = { mobileNumber, password };
    const response = await axiosInstanceAdmin.post('/admin/login', payload);
    return response.data;
};

export const getAdminById = async (id) => {
    const response = await axiosInstanceAdmin.get(`/admin/getAdmin/${id}`);
    return response.data;
};

export const updateAdmin = async (id, adminData, imageFile) => {
    const formData = new FormData();
    formData.append("admin", JSON.stringify(adminData));
    if (imageFile) {
        formData.append("imageFile", imageFile);
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
