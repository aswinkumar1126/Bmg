import AppRoutes from "./routes/AppRoutes";
import './App.css';
import { ThemeProvider } from "./context/ThemeContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthContextProvider } from "../src/context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { ProfileProvider } from "./context/ProfileContext";
import { RateProvider } from "./context/RateContext"; // No need to import useRate here
import { ProductProvider } from "./context/ProductContext";
import { VideoProvider } from "./context/videoContext";
import { ImageSliderProvider } from "./context/imageSliderContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {

  const queryClient = new QueryClient();

  return (
    <div>
      <BrowserRouter>
        <ThemeProvider>
          <AuthContextProvider>
            <ProfileProvider>
              <RateProvider>
                <ProductProvider skipInitialFetch={true}>
                  <VideoProvider>
                    <ImageSliderProvider>
                      <QueryClientProvider client={queryClient || new QueryClient()}>
                <AppRoutes />
                        <ReactQueryDevtools initialIsOpen={false} />
                      </QueryClientProvider>
                    </ImageSliderProvider>
                  </VideoProvider>
                </ProductProvider>
              </RateProvider>
            </ProfileProvider>
          </AuthContextProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
