import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../pages/home/Home";
import './AppRoutes.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ImageSlider from "../pages/slider/ImageSlider";

function AppRouter() {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header />

                <main className="content-area">
                    <Routes>
                        {/* Show Home at root */}
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/image-slider" element={<ImageSlider />} />
                        {/* Optional 404 fallback */}
                        {/* <Route path="*" element={<NotFound />} /> */}
                    </Routes>
                </main>

                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default AppRouter;
