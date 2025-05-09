import React, { useEffect, useState } from "react"; 
import ImageSlider from "../slider/ImageSlider"
import Testimonial from "../testimonial/Testimonial";
import axiosInstance from "../../api/axios";
function Home() {

                                        //Image Slider
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

                                //Testimonial

 
    const [videoUrl, setVideoUrl] = useState(null);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get("/cloudinary/video");
                if (response.data) {
                    setVideoUrl(response.data);
                } else {
                    throw new Error("No video URL returned");
                }
            } catch (error) {
                console.error('Error fetching video URL:', error);
                setError("Failed to load testimonial video");
            } finally {
                setLoading(false);
            }
        };

        fetchVideo();
    }, []);

        return (
            <div>
                <section >
                    <ImageSlider images={images} loading={loading} error={error}/>
                </section>
                <Testimonial  videoUrl={videoUrl} loading={loading} error={error}/>
            </div>

        );
    };
export default Home;