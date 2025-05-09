// src/router/AppRouter.js
import {Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import ImageSlider from "../pages/slider/ImageSlider";
import Testimonial from "../pages/testimonial/Testimonial";
import LayoutWrapper from "../layouts/LayoutWrapper";
import NotFound from "../pages/notFound/NotFound";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './AppRoutes.css';
import Login from "../pages/login/Login";
import Product from "../pages/product/Product";


function AppRouter() {
    return (
        
            <Routes>
                <Route path="/" element={<LayoutWrapper><Home /></LayoutWrapper>} />
                <Route path="/home" element={<LayoutWrapper><Home /></LayoutWrapper>} />
                <Route path="/image-slider" element={<LayoutWrapper><ImageSlider /></LayoutWrapper>} />
                <Route path="/testimonials" element={<LayoutWrapper><Testimonial /></LayoutWrapper>} />
                <Route path="/product" element={<LayoutWrapper><Product /></LayoutWrapper>} />
                <Route path="/login" element={<Login />} />
                {/* Add a 404 route if needed */}
                 <Route path="*" element={<NotFound />} /> 
            </Routes>
     
    );
}

export default AppRouter;
