import AppRoutes from "./routes/AppRoutes";
import './App.css';
import { ThemeProvider } from "./context/ThemeContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthContextProvider } from "../src/context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { ProfileProvider } from "./context/ProfileContext";
function App() {
  return (
    <div>
      <BrowserRouter>
        <ThemeProvider>
          <AuthContextProvider>
            <ProfileProvider>
              <AppRoutes />
            </ProfileProvider>
          </AuthContextProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
