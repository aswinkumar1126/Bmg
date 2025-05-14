import React, { useEffect, useState } from "react";
import { useProductContext } from "../../../../context/ProductContext";
import styles from "./ManageProduct.module.css";
import { FiEdit, FiSave, FiTrash2, FiX } from "react-icons/fi";

const ManageProduct = () => {
    const { products, getAllProducts, updateProduct, deleteProduct } = useProductContext();
    const [editIndex, setEditIndex] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                await getAllProducts();
            } catch (err) {
                setError("Failed to fetch products");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, [getAllProducts]);

    const handleEditClick = (index, product) => {
        setEditIndex(index);
        setEditedData({ ...product });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async (id) => {
        setIsLoading(true);
        try {
            await updateProduct(id, editedData);
            setEditIndex(null);
            setError(null);
        } catch (err) {
            setError("Failed to update product");
            console.error("Update failed:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            setIsLoading(true);
            try {
                await deleteProduct(id);
                setError(null);
            } catch (err) {
                setError("Failed to delete product");
                console.error("Delete failed:", err);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleCancel = () => {
        setEditIndex(null);
        setEditedData({});
    };

    if (isLoading && !editIndex) {
        return <div className={styles.loading}>Loading products...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.heading}>Manage Products</h2>
                {isLoading && <div className={styles.savingIndicator}>Saving changes...</div>}
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Weight</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody style={{ overflow: "auto" ,color:"black"}}>
                        {products.length > 0 ? (
                            products.map((prod, index) => (
                                <tr key={prod.id}>
                                    <td>
                                        <img
                                            src={prod.image_url}
                                            alt={prod.productName}
                                            className={styles.image}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://via.placeholder.com/60";
                                            }}
                                        />
                                    </td>
                                    <td>
                                        {editIndex === index ? (
                                            <input
                                                name="productName"
                                                value={editedData.productName || ""}
                                                onChange={handleChange}
                                                className={styles.input}
                                            />
                                        ) : (
                                            prod.productName
                                        )}
                                    </td>
                                    <td>
                                        {editIndex === index ? (
                                            <input
                                                name="productWeight"
                                                value={editedData.productWeight || ""}
                                                onChange={handleChange}
                                                className={styles.input}
                                            />
                                        ) : (
                                            prod.productWeight
                                        )}
                                    </td>
                                    <td>
                                        {editIndex === index ? (
                                            <input
                                                type="number"
                                                name="productPrice"
                                                value={editedData.productPrice || ""}
                                                onChange={handleChange}
                                                className={styles.input}
                                                step="0.01"
                                                min="0"
                                            />
                                        ) : (
                                            `$${parseFloat(prod.productPrice).toFixed(2)}`
                                        )}
                                    </td>
                                    <td>
                                        {editIndex === index ? (
                                            <textarea
                                                name="productDescription"
                                                value={editedData.productDescription || ""}
                                                onChange={handleChange}
                                                className={styles.textarea}
                                                rows="2"
                                            />
                                        ) : (
                                            prod.productDescription || "N/A"
                                        )}
                                    </td>
                                    <td className={styles.actions}>
                                        {editIndex === index ? (
                                            <div className={styles.editActions}>
                                                <button
                                                    className={`${styles.button} ${styles.saveBtn}`}
                                                    onClick={() => handleSave(prod.id)}
                                                    disabled={isLoading}
                                                >
                                                    <FiSave className={styles.icon} /> Save
                                                </button>
                                                <button
                                                    className={`${styles.button} ${styles.cancelBtn}`}
                                                    onClick={handleCancel}
                                                    disabled={isLoading}
                                                >
                                                    <FiX className={styles.icon} /> Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <div className={styles.defaultActions}>
                                                <button
                                                    className={`${styles.button} ${styles.editBtn}`}
                                                    onClick={() => handleEditClick(index, prod)}
                                                    disabled={isLoading}
                                                >
                                                    <FiEdit className={styles.icon} /> Edit
                                                </button>
                                                <button
                                                    className={`${styles.button} ${styles.deleteBtn}`}
                                                    onClick={() => handleDelete(prod.id)}
                                                    disabled={isLoading}
                                                >
                                                    <FiTrash2 className={styles.icon} /> Delete
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className={styles.noProducts}>
                                    No products found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProduct;