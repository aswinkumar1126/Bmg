import AppRoutes from "./routes/AppRoutes";
import './App.css';
import { ThemeProvider } from "./context/ThemeContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function App() {
  return (
<div>
      <ThemeProvider>
          <AppRoutes />
      </ThemeProvider>
  
</div>
  );
}

export default App;
