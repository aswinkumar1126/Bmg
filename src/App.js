import AppRoutes from "./routes/AppRoutes";
import './App.css';
import { ThemeProvider } from "./context/ThemeContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthContextProvider } from "../src/context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { ProfileProvider } from "./context/ProfileContext";
import { RateProvider } from "./context/RateContext"; // No need to import useRate here

function App() {
  return (
    <div>
      <BrowserRouter>
        <ThemeProvider>
          <AuthContextProvider>
            <ProfileProvider>
              <RateProvider>
                <AppRoutes />
              </RateProvider>
            </ProfileProvider>
          </AuthContextProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
