import React from "react";
import { useNavigate } from "react-router-dom";
import "./AllProducts.css";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import ErrorComponent from "../../components/ErrorComponent"

function AllProducts({ products, loading, error }) {
    const navigate = useNavigate();

    if (error) {
        return <ErrorComponent error={error} />;
    }

    return (
        <div className="product-page">
            <div className="page-header">
                <h2 className="title animate-char">Our Premium Collection</h2>
                <p className="subtitle animate-subtitle">Discover quality products for your needs</p>
            </div>

            <div className="product-grid">
                {loading ? (
                    <LoadingSkeleton count={6} />
                ) : (
                    products.map((product) => (
                        <div className="product-card" key={product.id}>
                            <div className="image-container">
                                {product.productImage?.imageByte ? (
                                    <img
                                        src={`data:${product.productImage.imageType || 'image/jpeg'};base64,${product.productImage.imageByte}`}
                                        alt={product.productName}
                                        className="product-image"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="image-placeholder">No Image</div>
                                )}
                                <div
                                    className="quick-view"
                                    onClick={() => navigate(`/product/${product.id}`)}
                                >
                                    Quick View
                                </div>
                            </div>
                            <div className="product-info">
                                <h3 className="product-name">{product.productName}</h3>
                                <p className="product-price">₹{product.productPrice?.toLocaleString() || 'N/A'}</p>
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

export default AllProducts;