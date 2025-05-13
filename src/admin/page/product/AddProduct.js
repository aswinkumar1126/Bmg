import React, { useState } from "react";
import { FiUpload, FiCheckCircle, FiXCircle } from "react-icons/fi";
import axiosInstance from "../../../api/axios";
import styles from "./AddProduct.module.css";

const AddProduct = () => {
    const [productData, setProductData] = useState({
        productName: "",
        productPrice: "",
        productWeight: "",
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState({ text: "", type: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setMessage({ text: "", type: "" });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ text: "", type: "" });

        const formData = new FormData();
        formData.append("productData", JSON.stringify(productData));
        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await axiosInstance.post("/admin/product", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 201) {
                setMessage({
                    text: "Product added successfully!",
                    type: "success"
                });
                setProductData({
                    productName: "",
                    productPrice: "",
                    productWeight: "",
                });
                setImage(null);
                setPreview(null);

                // Clear success message after 3 seconds
                setTimeout(() => {
                    setMessage({ text: "", type: "" });
                }, 3000);
            } else {
                setMessage({
                    text: "Failed to add product.",
                    type: "error"
                });
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage({
                text: error.response?.data?.message || "Something went wrong.",
                type: "error"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const removeImage = () => {
        setImage(null);
        setPreview(null);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Add New Product</h2>

            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            Product Name
                            <input
                                type="text"
                                name="productName"
                                value={productData.productName}
                                onChange={handleChange}
                                className={styles.input}
                                required
                                placeholder="Enter product name"
                            />
                        </label>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            Product Price (₹)
                            <input
                                type="number"
                                name="productPrice"
                                value={productData.productPrice}
                                onChange={handleChange}
                                className={styles.input}
                                required
                                min="0"
                                step="0.01"
                                placeholder="Enter price"
                            />
                        </label>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            Product Weight (grams)
                            <input
                                type="number"
                                name="productWeight"
                                value={productData.productWeight}
                                onChange={handleChange}
                                className={styles.input}
                                required
                                min="0"
                                placeholder="Enter weight"
                            />
                        </label>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.fileInputLabel}>
                            <span className={styles.fileInputText}>
                                <FiUpload className={styles.uploadIcon} />
                                {image ? image.name : "Choose product image"}
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className={styles.fileInput}
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className={styles.spinner}></span>
                        ) : (
                            "Add Product"
                        )}
                    </button>
                </form>

                {preview && (
                    <div className={styles.imagePreviewContainer}>
                        <div className={styles.imagePreviewWrapper}>
                            <img
                                src={preview}
                                alt="Preview"
                                className={styles.previewImage}
                            />
                            <button
                                onClick={removeImage}
                                className={styles.removeImageButton}
                                aria-label="Remove image"
                            >
                                <FiXCircle />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {message.text && (
                <div className={`${styles.message} ${styles[message.type]}`}>
                    {message.type === "success" ? (
                        <FiCheckCircle className={styles.messageIcon} />
                    ) : (
                        <FiXCircle className={styles.messageIcon} />
                    )}
                    <span>{message.text}</span>
                </div>
            )}
        </div>
    );
};

export default AddProduct;