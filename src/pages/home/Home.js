import ImageSlider from "../slider/ImageSlider";
//import Testimonial from "../testimonial/Testimonial";
import AllProducts from "../products/AllProducts";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import ErrorComponent from "../../components/ErrorComponent";
import Videos from "../video/Videos";

import { useProducts } from "../../store/product/useProductQueries";
import { useLatestVideo } from "../../store/video/useVideoQueries";
import "./Home.css";
import { useBanners } from "../../store/banner/useBannerQueries";
function Home() {



    const { data: banners, isLoading: bannersLoading, isError: bannersError } = useBanners();
    const { data: products, isLoading: productsLoading, isError: productsError } = useProducts();
    const { data: latestVideo, isLoading: videoLoading, isError: videoError } = useLatestVideo();



    const hasError = productsError || videoError || bannersError;

    if (productsLoading) return <LoadingSkeleton count={6} />;
    if (hasError) return <ErrorComponent error={productsError || videoError || bannersError} onRetry={() => window.location.reload()} />;

    return (
        <div className="home-section">
            <section>
                <ImageSlider images={banners} loading={bannersLoading} />
            </section>

            <section className="all-products-section">
                <AllProducts products={products} isLoading={productsLoading} isError={productsError} />
            </section>

            <section className="video-section">
                <Videos videoUrl={latestVideo} loading={videoLoading} />
            </section>

             {/* <section className="testimonial-section">
                <Testimonial />
            </section>  */}
        </div>
    );
}

export default Home;
