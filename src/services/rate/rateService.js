import axiosInstance from '../../api/axios';

// Helper: Handles errors consistently
const handleApiError = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
        return error.response.data.message;
    }
    return 'An unexpected error occurred.';
};

// Fetch all rates (with optional pagination support)
export const fetchRates = async () => {
    try {
        const response = await axiosInstance.get('/rates');
        return response.data; // Should return { data: [...], totalPages, currentPage }
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};

// Add a new rate
export const addRate = async (rateData) => {
    try {
        const response = await axiosInstance.post('/rate', rateData);
        return response.data;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};

// Update an existing rate by ID
export const updateRate = async (id, updatedRate) => {
    try {
        const response = await axiosInstance.put(`/rate/${id}`, updatedRate);
        return response.data;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};

// Delete a rate by ID
export const deleteRate = async (id) => {
    try {
        const response = await axiosInstance.delete(`/rate/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};
