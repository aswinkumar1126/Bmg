import React from 'react';
import { FiHeart, FiShoppingCart, FiEye } from 'react-icons/fi';
import './style/ProductCard.css';

function ProductCard({ product, onQuickView, onAddToCart, onAddToWishlist }) {
    const [isWishlisted, setIsWishlisted] = React.useState(false);

    const handleAddToWishlist = (e) => {
        e.preventDefault();
        setIsWishlisted(!isWishlisted);
        if (onAddToWishlist) onAddToWishlist(product);
    };

    return (
        <article className="product-card">
            <div className="product-card__badge">
                {product.isNew && <span className="badge badge--new">New</span>}
                {product.discount && <span className="badge badge--discount">-{product.discount}%</span>}
            </div>

            <div className="product-card__image-container">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.productName}
                        className="product-card__image"
                        loading="lazy"
                        width="300"
                        height="300"
                    />
                ) : (
                    <div className="product-card__image-placeholder">
                        <span>No Image Available</span>
                    </div>
                )}

                <button
                    className="product-card__quick-view"
                    onClick={onQuickView}
                    aria-label={`Quick view ${product.productName}`}
                >
                    <FiEye size={18} />
                    <span>Quick View</span>
                </button>

                <button
                    className={`product-card__wishlist ${isWishlisted ? 'active' : ''}`}
                    onClick={handleAddToWishlist}
                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                    <FiHeart size={18} />
                </button>
            </div>

            <div className="product-card__info">
                <h3 className="product-card__name">{product.productName}</h3>
                <div className="product-card__price">
                    {product.originalPrice && (
                        <span className="product-card__original-price">
                            ₹{product.originalPrice.toLocaleString()}
                        </span>
                    )}
                    <span className="product-card__current-price">
                        ₹{product.productPrice?.toLocaleString() || 'N/A'}
                    </span>
                </div>
                <div className="product-card__rating">
                    {[...Array(5)].map((_, i) => (
                        <span
                            key={i}
                            className={`star ${i < (product.rating || 0) ? 'filled' : ''}`}
                            aria-hidden="true"
                        >
                            ★
                        </span>
                    ))}
                    <span className="product-card__review-count">({product.reviewCount || 0})</span>
                </div>
                <button
                    className="product-card__add-to-cart"
                    onClick={onAddToCart}
                    aria-label={`Add ${product.productName} to cart`}
                >
                    <FiShoppingCart size={16} />
                    <span>Add to Cart</span>
                </button>
            </div>
        </article>
    );
}

export default ProductCard;