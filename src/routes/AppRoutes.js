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
import AllVideos from "../components/AllVideos";
import PrivateRoute from "./admin/PrivateRoute";
import Layout from "../admin/layout/Layout";

// Admin pages
import MainContent from "../admin/page/main/MainContent";
import AdminProfile from "../admin/page/profile/AdminProfile";
import AddImageSlider from "../admin/page/addImageSlider/AddImageSlider";
import AddVideo from "../admin/page/addVideo/AddVideo";
import AddRate from "../admin/page/Rates/AddRate";
import ManageRate from "../admin/page/Rates/ManageRate";
import AddProduct from "../admin/page/product/AddProduct";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './AppRoutes.css';

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
            <Route path="/videos" element={<LayoutWrapper><AllVideos /></LayoutWrapper>} />
            <Route path="/products" element={<LayoutWrapper><Product /></LayoutWrapper>} />
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
                <Route path="rates/add" element={<AddRate />} />
                <Route path="rates/manage" element={<ManageRate />} />
                <Route path="products/add" element={<AddProduct />} />
                {/* Add more nested routes as needed */}
            </Route>

            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRouter;
