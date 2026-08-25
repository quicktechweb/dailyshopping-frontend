import { useEffect } from "react";
import Bannersec from "../../../Shared/Navbar/Bannersec";
import Brands from "../Brands/Brands";
import HomeCategoryBanner from "../HomeCategoryBanner/HomeCategoryBanner";
// import HomeSlider from "../HomeSlider/HomeSlider";
import LatestDeals from "../LatestDeals/LatestDeals";
import LatestProduct from "../LatestProduct/LatestProduct";
import PopularCategories from "../PopularCategories/PopularCategories";
// import Lottery from "../Lottery/Lottery";
import PremiumProduct from "../PremimumProduct/PremimumProduct";
import ProductCarousel from "../ProductCarousel/ProductCarousel";
import PromoCardSection from "../PromoCardSection/PromoCardSection";
import PromoSection from "../PromoSection/PromoSection";
import TopSelling from "../TopSelling/TopSelling";
import Promo from "../PromoCardSection/Promo";


const Home = () => {

  // useEffect(() => {
  //   document.title = "LuckyShop";

  //   const metaDescription = document.querySelector('meta[name="description"]');
  //   if (metaDescription) {
  //     metaDescription.setAttribute(
  //       "content",
  //       "Buy amazing products at LuckyShop"
  //     );
  //   } else {
  //     const meta = document.createElement("meta");
  //     meta.name = "description";
  //     meta.content = "Buy amazing products at LuckyShop";
  //     document.head.appendChild(meta);
  //   }

  //   const ogImage = document.querySelector('meta[property="og:image"]');
  //   if (ogImage) {
  //     ogImage.setAttribute("content", "");
  //   } else {
  //     const meta = document.createElement("meta");
  //     meta.setAttribute("property", "og:image");
  //     meta.content = "";
  //     document.head.appendChild(meta);
  //   }
  // }, []);
  return (
    <div>
      {/* <Bannersec/> */}
      <PromoSection/>
      {/* <PromoCardSection/> */}
      <Promo/>
      {/* <PopularCategories/> */}
      {/* <HomeCategoryBanner/> */}
     {/* <HomeSlider/> */}
    <div className="-mt-28 md:mt-0">
       {/* <TopSelling/> */}
    </div>
    {/* <Lottery/> */}
    <div className="-mt-5">
       <LatestProduct/>
    </div>
     {/* <ProductCarousel/> */}
     {/* <PremiumProduct/> */}
     {/* <TopRatedProduct/> */}
     {/* <LatestDeals/> */}
     {/* <CuponPart/> */}
     {/* <Brands/> */}
    </div>
  );
};

export default Home;



