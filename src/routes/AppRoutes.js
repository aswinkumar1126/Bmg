import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "../pages/home/Home";
import ImageSlider from "../pages/slider/ImageSlider";
import Testimonial from "../pages/testimonial/Testimonial";
import LayoutWrapper from "../layouts/LayoutWrapper";
import NotFound from "../pages/notFound/NotFound";
import Login from "../admin/page/login/Login";
import Product from "../components/Product";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Video from "../components/Video";
import PrivateRoute from "./admin/PrivateRoute";
import Layout from "../admin/layout/Layout";
// Admin pages
import MainContent from "../admin/page/main/MainContent";
import AdminProfile from "../admin/page/profile/ProfilePage";
import AddImageSlider from "../admin/page/imageSlider/addImageSlider/AddImageSlider";
import ManageImageSlider from "../admin/page/imageSlider/manageImageSlider/manageImageSlider";
import AddRate from "../admin/page/Rates/addRate/AddRate";
import ManageRate from "../admin/page/Rates/manageRate/ManageRate";
import AddProduct from "../admin/page/product/addProduct/AddProduct"
import ManageProduct from "../admin/page/product/manageProduct/ManageProduct";
import AddVideo from "../admin/page/video/addVideo/AddVideo";
import ManageVideos from "../admin/page/video/manageVideo/ManageVideos";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './AppRoutes.css';
import ProductDetails from "../pages/productDetails/productDetails";

function AppRouter() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [location.pathname]);

    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LayoutWrapper><Home /></LayoutWrapper>} />
            <Route path="/home" element={<LayoutWrapper><Home /></LayoutWrapper>} />
            <Route path="/image-slider" element={<LayoutWrapper><ImageSlider /></LayoutWrapper>} />
            <Route path="/testimonials" element={<LayoutWrapper><Testimonial /></LayoutWrapper>} />
            <Route path="/about" element={<LayoutWrapper><About /></LayoutWrapper>} />
            <Route path="/contact" element={<LayoutWrapper><Contact /></LayoutWrapper>} />
            <Route path="/videos" element={<LayoutWrapper><Video /></LayoutWrapper>} />
            <Route path="/products" element={<LayoutWrapper><Product /></LayoutWrapper>} />
            <Route path="/product/:id" element={<LayoutWrapper><ProductDetails /></LayoutWrapper>} />
            <Route path="/login" element={<Login />} />

            {/* Protected Admin Routes with Layout */}
            <Route
                path="/admin"
                element={
                    <PrivateRoute>
                        <Layout />
                    </PrivateRoute>
                }
            >
                <Route index element={<MainContent />} />
                <Route path="dashboard" element={<MainContent />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="offer-&-banner/add" element={<AddImageSlider />} />
                <Route path="videos/add" element={<AddVideo />} />
                <Route path="videos/manage" element={<ManageVideos />} />
                <Route path="rates/add" element={<AddRate />} />
                <Route path="rates/manage" element={<ManageRate />} />
                <Route path="products/add" element={<AddProduct />} />
                <Route path="products/manage" element={<ManageProduct />} />
                <Route path="offer-&-banner/manage" element={<ManageImageSlider />} />


                {/* Add more nested routes as needed */}
            </Route>

            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRouter;
