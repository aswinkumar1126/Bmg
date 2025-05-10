import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./style/Product.css";

function Product() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get("/admin/product/product-lists");
                // Simulate network delay for demo purposes
                await new Promise(resolve => setTimeout(resolve, 1500));
                setProducts(response.data);
            } catch (err) {
                setError("Failed to load products. Please try again later.");
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Skeleton loading component
    const ProductSkeleton = () => (
        <div className="product-card skeleton">
            <div className="image-container skeleton-image"></div>
            <div className="product-info">
                <div className="skeleton-line" style={{ width: '80%' }}></div>
                <div className="skeleton-line" style={{ width: '60%' }}></div>
                <div className="product-actions">
                    <div className="skeleton-button"></div>
                    <div className="skeleton-button" style={{ width: '40px' }}></div>
                </div>
            </div>
        </div>
    );

    if (error) {
        return (
            <div className="error-container">
                <div className="error-icon">!</div>
                <p>{error}</p>
                <button
                    className="retry-button"
                    onClick={() => window.location.reload()}
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="product-page">
            <div className="page-header">
                <h2 className="title animate-char">Our Premium Collection</h2>
                <p className="subtitle animate-subtitle">Discover quality products for your needs</p>
            </div>

            <div className="product-grid">
                {loading ? (
                    Array(6).fill().map((_, index) => (
                        <ProductSkeleton key={`skeleton-${index}`} />
                    ))
                ) : (
                    products.map((product) => (
                        <div className="product-card" key={product.id}>
                            <div className="image-container">
                                <img
                                    src={`data:image/jpeg;base64,${product.productImage.imageByte}`}
                                    alt={product.productName}
                                    className="product-image"
                                    loading="lazy"
                                />
                                <div
                                    className="quick-view"
                                    onClick={() => navigate(`/product/${product.id}`)}
                                >
                                    Quick View
                                </div>
                            </div>
                            <div className="product-info">
                                <h3 className="product-name">{product.productName}</h3>
                                <p className="product-price">₹{product.productPrice.toLocaleString()}</p>
                                <div className="product-actions">
                                    <button
                                        className="buy-button pulse"
                                        onClick={() => navigate(`/product/${product.id}`)}
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        className="wishlist-button heartbeat"
                                        aria-label="Add to wishlist"
                                    >
                                        ♡
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Product;