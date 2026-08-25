import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Pages/Shared/Navbar/Navbar";
import Footer from "./Pages/Shared/Footer/Footer";
import DetailsNavbar from "./Pages/Shared/Navbar/DetailsNavbar";
import SellerNavbar from "./Pages/Shared/Navbar/SellerNavbar/SellerNavbar";
import CategoryNavbar from "./Pages/Shared/CategoryNavbar/CategoryNavbar";

const Layout = () => {
  const location = useLocation();

  const isDashboardRoute = location.pathname.startsWith("/dashboard");
  const isProductDetailsRoute = location.pathname.startsWith("/productdetails");
  const isSellerRoute = location.pathname.startsWith("/sellershop");
  const isSellerRoutes = location.pathname.startsWith("/seller-review");
  const isCategoryMobileRoute = location.pathname.startsWith("/categorypartmobile"); // new route

  return (
    <div className="flex flex-col min-h-screen">

      {/* ================= DESKTOP NAVBAR ================= */}
      <div className="hidden sm:block">
        {isCategoryMobileRoute ? null : <Navbar />}
      </div>

      {/* ================= MOBILE NAVBAR (ONLY ONE PLACE) ================= */}
      <div className="sm:hidden">
        {isCategoryMobileRoute ? (
          <CategoryNavbar />
        ) : isSellerRoute || isSellerRoutes ? (
          <SellerNavbar />
        ) : isProductDetailsRoute ? (
          <DetailsNavbar />
        ) : (
          <Navbar />
        )}
      </div>

      {/* ================= MAIN ================= */}
      <main className="flex-1 pt-[140px]">
        <Outlet />
      </main>

      {/* ================= FOOTER ================= */}
      {!isDashboardRoute && !isCategoryMobileRoute && (
        <>
          {isProductDetailsRoute ? (
            <footer className="hidden sm:block">
              <Footer />
            </footer>
          ) : (
            <footer>
              <Footer />
            </footer>
          )}
        </>
      )}
    </div>
  );
};

export default Layout;
