import React, { useEffect, useState, useCallback } from "react";
import ImageSlider from "../slider/ImageSlider";
import Testimonial from "../testimonial/Testimonial";
import { useProductContext } from "../../context/ProductContext";
import AllProducts from "../products/AllProducts";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import ErrorComponent from "../../components/ErrorComponent";
import Videos from "../video/Videos";
import { axiosInstanceAdmin } from "../../api/axios";
import { useVideo } from "../../context/videoContext";
import "./Home.css";
function Home() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { products, loading: productsLoading, error: productsError, getAllProducts } = useProductContext();
    const { latestVideo, loading: videoLoading, error: videoError, getLatestVideo } = useVideo();

    const fetchAllData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const imagesRes = await axiosInstanceAdmin.get("/slider/getAllImage");
            setImages(imagesRes.data);

            await getAllProducts();
            await getLatestVideo(); // ✅ Use context method to get latest video

        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Failed to load data. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [getAllProducts, getLatestVideo]);

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    if (error || productsError || videoError) {
        return <ErrorComponent error={error || productsError || videoError} onRetry={fetchAllData} />;
    }

    return (
        <div className="home-section" >
            <section>
                <ImageSlider images={images} loading={loading} />
            </section>

            <section className="video-section">
                <Videos videoUrl={latestVideo} loading={loading || videoLoading} />
            </section>

            <section className="all-products-section">
                {loading || productsLoading ? (
                    <LoadingSkeleton count={6} />
                ) : (
                    <AllProducts products={products} />
                )}
            </section>

            <section className="testimonial-section">
                <Testimonial videoUrl={latestVideo} loading={loading || videoLoading} />
            </section>
        </div>
    );
}

export default Home;
