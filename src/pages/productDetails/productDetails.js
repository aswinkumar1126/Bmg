import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import ErrorComponent from "../../components/ErrorComponent";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import CustomButton from "../../components/Button";
import "./ProductDetails.css";
import { useProductById } from "../../store/product/useProductQueries";

const ProductDetails = () => {
    const { id } = useParams();
    const { data: productDetail, isLoading, isError, error } = useProductById(id);

    const [zoomStyle, setZoomStyle] = useState({});
    const [showZoom, setShowZoom] = useState(false);
    const imgRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!imgRef.current) return;
        const { left, top, width, height } = imgRef.current.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setZoomStyle({
            backgroundImage: `url(${productDetail?.image_url})`,
            backgroundPosition: `${x}% ${y}%`
        });
    };

    if (isError) return <ErrorComponent error={error} />;
    if (isLoading || !productDetail) return <LoadingSkeleton count={1} type="details" />;

    return (
        <div className="product-details-wrapper">
            {/* Image Section */}
            <div className="product-image-section">
                <div
                    className="image-container"
                    onMouseEnter={() => setShowZoom(true)}
                    onMouseLeave={() => setShowZoom(false)}
                    onMouseMove={handleMouseMove}
                    ref={imgRef}
                >
                    <img
                        src={productDetail.image_url}
                        alt={productDetail.productName}
                        className="main-product-image"
                    />
                </div>

                <div className="product-buttons-row">
                    <CustomButton className="buy-now-btn" label="Add to Cart" ></CustomButton>
                    <CustomButton className="buy-now-btn" label="Buy Now" ></CustomButton>
                </div>
            </div>

            {/* Info Section */}
            <div className="product-info-section">
                <h1 className="product-title">{productDetail.productName}</h1>

                <div className="price-section">
                    <span className="current-price">₹{productDetail.productPrice}</span>
                    {productDetail.originalPrice && (
                        <span className="original-price">₹{productDetail.originalPrice}</span>
                    )}
                    {productDetail.discountPercentage && (
                        <span className="discount">{productDetail.discountPercentage}% off</span>
                    )}
                </div>

                {(productDetail.rating || productDetail.reviewCount) && (
                    <div className="rating-section">
                        {productDetail.rating && (
                            <div className="rating-badge">{productDetail.rating} ★</div>
                        )}
                        {productDetail.reviewCount && (
                            <span className="rating-count">{productDetail.reviewCount} Ratings & Reviews</span>
                        )}
                    </div>
                )}

                {showZoom && (
                    <div className="zoom-preview-section">
                        <div className="zoom-preview" style={zoomStyle} />
                    </div>
                )}

                <div className="specifications">
                    <h3>Specifications</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td>Weight</td>
                                <td>{productDetail.productWeight}g</td>
                            </tr>
                            {productDetail.brand && (
                                <tr>
                                    <td>Brand</td>
                                    <td>{productDetail.brand}</td>
                                </tr>
                            )}
                            {/* Add more fields as needed */}
                        </tbody>
                    </table>
                </div>

                <div className="product-description">
                    <h3>Description</h3>
                    <p>{productDetail.productDescription}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
