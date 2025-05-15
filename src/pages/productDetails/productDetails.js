import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../../context/ProductContext";
import ErrorComponent from "../../components/ErrorComponent";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import "./ProductDetails.css";

const ProductDetails = () => {
    const { id } = useParams();
    const {
        productDetail,
        loading,
        error,
        getProductById,
    } = useProductContext();

    useEffect(() => {
        if (id) {
            getProductById(id);
        }
    }, [id, getProductById]);

    if (error) return <ErrorComponent error={error} />;
    if (loading || !productDetail) return <LoadingSkeleton count={1} type="details" />;

    return (
        <div className="product-details-container">
            <div className="image-section">
                <img src={productDetail.image_url} alt={productDetail.name} />
            </div>
            <div className="details-section">
                <h2>{productDetail.productName}</h2>
                <p className="price">₹{productDetail.productPrice}</p>
                <p><strong>Weight:</strong> {productDetail.productWeight}g</p>
                <p><strong>Description:</strong> {productDetail.productDescription}</p>
                <button className="add-to-cart-btn">Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductDetails;
