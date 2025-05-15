import { axiosInstanceAdmin } from "../../api/axios";

const getAllProducts = async () => {
    const response = await axiosInstanceAdmin.get(`/getAllProducts`);
    return response.data;
};

const getProductById = async (id) => {
    const response = await axiosInstanceAdmin.get(`/getProduct/${id}`);
    return response.data;
};

const createProduct = async (formData) => {
    const response = await axiosInstanceAdmin.post(`/createProduct`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

const updateProduct = async (id, updatedData) => {
    const formData = new FormData();
    formData.append("productName", updatedData.productName);
    formData.append("productWeight", updatedData.productWeight);
    formData.append("productPrice", updatedData.productPrice);
    formData.append("productDescription", updatedData.productDescription);

    if (updatedData.image instanceof File) {
        formData.append("image", updatedData.image);
    }

    const response = await axiosInstanceAdmin.put(
        `/updateProduct/${id}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return response.data;
};

const deleteProduct = async (id) => {
    const response = await axiosInstanceAdmin.delete(`/removeProduct/${id}`);
    return response.data;
};

export const productService = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
