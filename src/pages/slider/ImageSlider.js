import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageSlider.css";
import axiosInstance from "../../api/axios";
function ImageSlider() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch image data from API
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axiosInstance.get("/slider/getAllImage");
                setImages(response.data); // Axios automatically parses JSON
            } catch (err) {
                console.error("Error fetching images:", err);
                setError("Failed to load images. Please try again later.");
            } finally {
                setLoading(false);
            }
        };


        fetchImages();
    }, []);

    // Slider settings with responsive breakpoints
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        pauseOnHover: true,
        cssEase: "ease-in-out",
        adaptiveHeight: true,
    };

    return (
        <div className="slider-container">
            {error ? (
                <div className="error-message">
                    {error}
                    <button
                        className="retry-button"
                        onClick={() => window.location.reload()}
                    >
                        Retry
                    </button>
                </div>
            ) : loading ? (
                <div className="skeleton-wrapper">
                    <Skeleton height={400} className="skeleton-image" />
                    <div className="skeleton-dots">
                        <Skeleton height={16} width={80} count={3} inline />
                    </div>
                </div>
            ) : images.length > 0 ? (
                <Slider {...settings}>
                    {images.map((img, index) => (
                        <div key={index} className="slide">
                            <img
                                src={img?.imageUrl || img?.bannerImagePath || img}
                                alt={`Slide ${index + 1}`}
                                className="slide-image"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/fallback-image.jpg";
                                }}
                            />
                            <p>{img.title}</p>
                        </div>
                    ))}
                </Slider>
            ) : (
                <div className="no-images">No images available</div>
            )}
        </div>
    );
}

export default ImageSlider;