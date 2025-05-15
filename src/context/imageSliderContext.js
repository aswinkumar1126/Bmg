import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
    getAllSliderImages,
    addSliderImage,
    updateSliderImage,
    deleteSliderImage,
} from '../services/imageSlider/imageSliderService';

//  Create a context object
 const imageSliderContext = createContext();

// Custom hook for cleaner context consumption
export const useImageSlider = () => useContext(imageSliderContext);

//  Provider Component
export const ImageSliderProvider = ({ children }) => {
    const [sliderImages, setSliderImages] = useState([]);
    const [loading, setLoading] = useState(false);

    //  Fetch all images - with useCallback to avoid unnecessary rerenders
    const fetchSliderImages = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getAllSliderImages();
            setSliderImages(data);
        } catch (error) {
            console.error('Error fetching slider images:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    //  Add new slider image
    const handleAddImage = useCallback(async (title, file) => {
        try {
            const newImage = await addSliderImage(title, file);
            setSliderImages((prev) => [...prev, newImage]); // append to state
        } catch (error) {
            console.error('Error adding slider image:', error);
        }
    }, []);

    //  Update an existing image
    const handleUpdateImage = useCallback(async (id, title, description, file) => {
        try {
            const updated = await updateSliderImage(id, title, description, file);
            setSliderImages((prev) =>
                prev.map((img) => (img.id === id ? updated : img))
            );
        } catch (error) {
            console.error('Error updating slider image:', error);
        }
    }, []);

    //  Delete an image
    const handleDeleteImage = useCallback(async (id) => {
        try {
            await deleteSliderImage(id);
            setSliderImages((prev) => prev.filter((img) => img.id !== id));
        } catch (error) {
            console.error('Error deleting slider image:', error);
        }
    }, []);

    //  Load images on mount
    useEffect(() => {
        fetchSliderImages();
    }, [fetchSliderImages]);

    //  Provide context value
    return (
        <imageSliderContext.Provider
            value={{
                sliderImages,
                loading,
                fetchSliderImages,
                handleAddImage,
                handleUpdateImage,
                handleDeleteImage,
            }}
        >
            {children}
        </imageSliderContext.Provider>
    );
};

export default imageSliderContext;