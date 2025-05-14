import React, { useState } from "react";
import { FiUpload, FiCheckCircle, FiXCircle, FiTrash2 } from "react-icons/fi";
import axiosInstance from "../../../../api/axios";
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
            // Validate image type and size
            if (!file.type.match('image.*')) {
                setMessage({ text: "Please select an image file", type: "error" });
                return;
            }
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                setMessage({ text: "Image size should be less than 2MB", type: "error" });
                return;
            }

            setImage(file);
            setPreview(URL.createObjectURL(file));
            setMessage({ text: "", type: "" });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (!productData.productName.trim()) {
            setMessage({ text: "Product name is required", type: "error" });
            return;
        }
        if (isNaN(productData.productPrice) || parseFloat(productData.productPrice) <= 0) {
            setMessage({ text: "Please enter a valid price", type: "error" });
            return;
        }
        if (isNaN(productData.productWeight) || parseInt(productData.productWeight) <= 0) {
            setMessage({ text: "Please enter a valid weight", type: "error" });
            return;
        }
        if (!image) {
            setMessage({ text: "Product image is required", type: "error" });
            return;
        }

        setIsSubmitting(true);
        setMessage({ text: "", type: "" });

        const formData = new FormData();
        formData.append("productData", JSON.stringify({
            ...productData,
            productPrice: parseFloat(productData.productPrice),
            productWeight: parseInt(productData.productWeight)
        }));
        formData.append("image", image);

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
                // Reset form
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
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage({
                text: error.response?.data?.message || "An error occurred while adding the product",
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
        <div className={styles.adminPanel}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.heading}>Add New Product</h1>
                    <p className={styles.subHeading}>Fill in the details below to add a new product</p>
                </header>

                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Product Name *
                                    <input
                                        type="text"
                                        name="productName"
                                        value={productData.productName}
                                        onChange={handleChange}
                                        className={styles.input}
                                        placeholder="Enter product name"
                                        required
                                    />
                                </label>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Price (₹) *
                                    <div className={styles.inputWithUnit}>
                                        <input
                                            type="number"
                                            name="productPrice"
                                            value={productData.productPrice}
                                            onChange={handleChange}
                                            className={styles.input}
                                            min="0"
                                            step="0.01"
                                            placeholder="0.00"
                                            required
                                        />
                                        <span className={styles.unit}>₹</span>
                                    </div>
                                </label>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Weight (grams) *
                                    <div className={styles.inputWithUnit}>
                                        <input
                                            type="number"
                                            name="productWeight"
                                            value={productData.productWeight}
                                            onChange={handleChange}
                                            className={styles.input}
                                            min="0"
                                            placeholder="0"
                                            required
                                        />
                                        <span className={styles.unit}>g</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className={styles.imageUploadSection}>
                            <h3 className={styles.sectionTitle}>Product Image *</h3>
                            <p className={styles.sectionDescription}>Upload a high-quality image of your product</p>

                            {preview ? (
                                <div className={styles.imagePreviewContainer}>
                                    <div className={styles.imagePreviewWrapper}>
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className={styles.previewImage}
                                        />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className={styles.removeImageButton}
                                            aria-label="Remove image"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <label className={styles.fileInputLabel}>
                                    <div className={styles.fileInputContent}>
                                        <FiUpload className={styles.uploadIcon} />
                                        <span className={styles.fileInputText}>Drag & drop your image here or click to browse</span>
                                        <span className={styles.fileInputSubText}>Supports JPG, PNG (Max 2MB)</span>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className={styles.fileInput}
                                        required
                                    />
                                </label>
                            )}
                        </div>

                        <div className={styles.formActions}>
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
                        </div>
                    </form>
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
        </div>
    );
};

export default AddProduct;