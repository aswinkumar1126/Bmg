import { axiosInstanceAdmin } from "../../api/axios";

export const getAllTestimonials = async () => {
    const response = await axiosInstanceAdmin.get('/testimonials/getAll');
    return response.data;
};

// Create Testimonial expects a plain JS object (with fields + image File)
export const createTestimonial = async (data) => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('designation', data.designation);
    formData.append('message', data.message);
    formData.append('rating', data.rating);

    if (data.image) {
        formData.append('image', data.image);
    }

    const response = await axiosInstanceAdmin.post('/testimonials', formData);
    return response.data;
};
  

export const testimonialService = { getAllTestimonials, createTestimonial };
