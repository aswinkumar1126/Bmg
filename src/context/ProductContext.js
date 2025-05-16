// context/ProductContext.js
import React, { createContext, useContext, useState } from "react";
import { productService } from "../services/product/productService";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // ✅ CREATE
    const createProduct = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await productService.createProduct(formData);
            return data;
        } catch (err) {
            setError("Failed to create product.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // ✅ UPDATE
    const updateProduct = async (id, updatedData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await productService.updateProduct(id, updatedData);
            return data;
        } catch (err) {
            setError("Failed to update product.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // ✅ DELETE
    const deleteProduct = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await productService.deleteProduct(id);
        } catch (err) {
            setError("Failed to delete product.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProductContext.Provider
            value={{
                createProduct,
                updateProduct,
                deleteProduct,
                loading,
                error,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => useContext(ProductContext);
