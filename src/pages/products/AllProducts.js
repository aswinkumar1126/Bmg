import React from "react";
import { useNavigate } from "react-router-dom";
import "./AllProducts.css";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import ErrorComponent from "../../components/ErrorComponent";
import ProductCard from "../../components/ProductCard";

function AllProducts({ products = [], loading, error }) {
    const navigate = useNavigate();

    if (error) {
        return <ErrorComponent error={error} />;
    }

    console.log(products);

    return (
        <div className="product-container">
            <div className="page-header" >
                <h2 className="title animate-char">Our Premium Collection</h2>
                <p className="subtitle animate-subtitle">Discover quality products for your needs</p>
            </div>

             <div className="product-grid">
                {loading ? (
                    <LoadingSkeleton count={6} />
                ) : (
                    (products ?? []).map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onQuickView={() => navigate(`/product/${product.id}`)}
                            onAddToCart={() => navigate(`/product/${product.id}`)}
                        />
                    ))
                )}
            </div> 
        </div>
    );
}

export default AllProducts;
