// src/router/AppRouter.js
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import ImageSlider from "../pages/slider/ImageSlider";
import Testimonial from "../pages/testimonial/Testimonial";
import LayoutWrapper from "../layouts/LayoutWrapper";
import NotFound from "../pages/notFound/NotFound";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './AppRoutes.css';
import Login from "../admin/page/login/Login";
import Product from "../components/Product";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";


import AllVideos from "../components/AllVideos";

import DashBoard from "../admin/page/dashboard/DashBoard";


import ProtectedRoute from "./admin/ProtectedRoute";
function AppRouter() {



    return (

        <Routes>
            <Route path="/" element={<LayoutWrapper><Home /></LayoutWrapper>} />
            <Route path="/home" element={<LayoutWrapper><Home /></LayoutWrapper>} />
            <Route path="/image-slider" element={<LayoutWrapper><ImageSlider /></LayoutWrapper>} />
            <Route path="/testimonials" element={<LayoutWrapper><Testimonial /></LayoutWrapper>} />           
            <Route path="/about" element={<LayoutWrapper><About /></LayoutWrapper>} />
            <Route path="/contact" element={<LayoutWrapper ><Contact /> </LayoutWrapper>} />
            <Route path="/login" element={<Login />} />

            <Route path="/videos" element={<LayoutWrapper><AllVideos /></LayoutWrapper>} />
            <Route path="/products" element={<LayoutWrapper><Product /></LayoutWrapper>} />
            {/* Add a 404 route if needed */}
            <Route path="*" element={<NotFound />} />

            {/* Admin */}
           
            <Route path="/admin/dashboard" element={<ProtectedRoute> <DashBoard /> </ProtectedRoute>} />

        </Routes>

    );
}

export default AppRouter;
