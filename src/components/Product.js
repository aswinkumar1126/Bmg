import React from "react";
import { useNavigate } from "react-router-dom";
import "./style/Product.css";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../store/product/useProductQueries";

function Products() {
    const navigate = useNavigate();


    const { data: products, isLoading, isError } = useProducts();
    console.log(products);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching products</p>;

    return (
        <div className="product-page">
            <div className="page-header">
                <h2 className="title animate-char">Our Premium Collection</h2>
                <p className="subtitle animate-subtitle">Discover quality products for your needs</p>
            </div>

            <div className="product-grid">

                {(products ?? []).map((product) => (
                    <ProductCard
                        key={product.ids}
                        product={product}
                        onQuickView={() => navigate(`/product/${product.id}`)}
                        onAddToCart={() => navigate(`/product/${product.id}`)}
                    />
                )
                )}
            </div>
        </div>
    );
}

export default Products;
