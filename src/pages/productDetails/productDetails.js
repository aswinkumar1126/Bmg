import React from "react";
import { useParams } from "react-router-dom";
import ErrorComponent from "../../components/ErrorComponent";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import "./ProductDetails.css";
import { useProductById } from "../../store/product/useProductQueries";

const ProductDetails = () => {
    const { id } = useParams();
    const {
        data: productDetail,
        isLoading,
        isError,
        error
    } = useProductById(id);

    if (isError) return <ErrorComponent error={error} />;
    if (isLoading || !productDetail) return <LoadingSkeleton count={1} type="details" />;

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