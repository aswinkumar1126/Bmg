import AppRoutes from "./routes/AppRoutes";
import './App.css';
import { ThemeProvider } from "./context/ThemeContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthContextProvider } from "../src/context/AuthContext";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
        <ThemeProvider>
          <AuthContextProvider>
            <AppRoutes />
          </AuthContextProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
