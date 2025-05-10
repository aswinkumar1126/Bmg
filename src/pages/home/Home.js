import React, { useEffect, useState } from "react";
import ImageSlider from "../slider/ImageSlider";
import Testimonial from "../testimonial/Testimonial";
import axiosInstance from "../../api/axios";
import AllProducts from "../products/AllProducts";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import ErrorComponent from "../../components/ErrorComponent"
import Videos from "../video/Videos"

function Home() {
    const [data, setData] = useState({
        images: [],
        products: [],
        videoUrl: null,
        loading: true,
        error: null
    });

    const fetchAllData = async () => {
        try {
            setData(prev => ({ ...prev, loading: true }));

            // Fetch all data in parallel
            const [imagesRes, productsRes, videoRes] = await Promise.all([
                axiosInstance.get("/slider/getAllImage"),
                axiosInstance.get("/admin/product/product-lists"),
                axiosInstance.get("/cloudinary/video")
            ]);

            setData({
                images: imagesRes.data,
                products: productsRes.data,
                videoUrl: videoRes.data,
                loading: false,
                error: null
            });
        } catch (err) {
            console.error("Error fetching data:", err);
            setData(prev => ({
                ...prev,
                loading: false,
                error: "Failed to load data. Please try again later."
            }));
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    if (data.error) {
        return <ErrorComponent error={data.error} onRetry={fetchAllData} />;
    }

    return (
        <div>
            <section>
                <ImageSlider images={data.images} loading={data.loading} />
            </section>
            <section className="video-section">
                <Videos videoUrl={data.videoUrl} loading={data.loading} />
            </section>
            
            {data.loading ? (
                <LoadingSkeleton count={6} />
            ) : (
                <AllProducts products={data.products} />
            )}
            <Testimonial videoUrl={data.videoUrl} loading={data.loading} />
        </div>
    );
}

export default Home;