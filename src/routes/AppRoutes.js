import { BrowserRouter } from "react-router-dom";
import {Routes,Route} from "react-router-dom";
import Home from "../pages/home/Home";
import Header from "../components/Header";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from "../components/Footer";
function AppRoutes() {
        return (
            <div>              
                <BrowserRouter>
                    <Header />
                        <Routes>
                            <Route path="/home" element={<Home/>} />
                        </Routes>
                     <Footer />   
                </BrowserRouter>
            </div>
        );
    };
    
export default AppRoutes;