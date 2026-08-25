import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes.jsx";
import AuthProvider from "./Pages/Shared/Context/AuthProvider.jsx";
import { TranslationProvider } from "./Pages/Shared/Context/TranslationContext.jsx";
import CartContextProvider from "./Pages/Shared/Context/CartContext.jsx";
import { NotificationProvider } from "./Pages/Shared/Context/NotificationContext.jsx";
import PixelTracker from "./PixelTracker/PixelTracker.jsx";

function AppWithPixel() {
  return (
    <TranslationProvider>
      <AuthProvider>
        <CartContextProvider>
          <NotificationProvider>
            <RouterProvider router={router} fallbackElement={<div>Loading...</div>}>
              <PixelTracker /> {/* Must be inside Router context */}
            </RouterProvider>
          </NotificationProvider>
        </CartContextProvider>
      </AuthProvider>
    </TranslationProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWithPixel />
  </React.StrictMode>
);
