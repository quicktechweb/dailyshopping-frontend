import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardHome from "./Pages/Dashboard/DashboardHome/DashboardHome";


// import PrivetRoute from "./Pages/Shared/PrivetRoute/PrivetRoute";

import ErrorPage from "./Pages/Shared/Errorpage";
import Layout from "./Layout";
import MakeAdmin from "./Pages/Dashboard/MakeAdmin/MakeAdmin";
import UserAllData from "./Pages/Dashboard/UserAllData/UserAllData";
import PendingProduct from "./Pages/Dashboard/PendingProduct/PendingProduct";
import BannerPost from "./Pages/Dashboard/BannerPost/BannerPost";
import EditBanners from "./Pages/Dashboard/BannerPost/EditBanners";
import AllProductShow from "./Pages/Dashboard/AllProductShow/AllProductShow";
// import PrivetRoute from "./Pages/Shared/PrivetRoute/PrivetRoute";
import SubAdmin from "./Pages/Dashboard/MakeAdmin/SubAdmin/SubAdmin";
import ProductUpload from "./Pages/Dashboard/ProductUpload/ProductUpload";
import EditNavber from "./Pages/Dashboard/GetNavber/EditNavber";
import GetFooter from "./Pages/Dashboard/GetFooter/GetFooter";
import EditFooter from "./Pages/Dashboard/GetFooter/EditFooter";
import GetProduct from "./Pages/Dashboard/ProductUpload/GetProduct";
import EditProduct from "./Pages/Dashboard/ProductUpload/EditProduct";
import UpdateOrder from "./Pages/Dashboard/UpdateOrder/UpdateOrder";
// import PrivateRoute from "./Pages/Shared/PrivetRoute/PrivetRoute";
import AllUserOrder from "./Pages/Dashboard/UpdateOrder/AllUserOrder";
import Home from "./Pages/HomePage/Home/Home/Home";
import ProductDetailsPage from "./Pages/HomePage/ProductPage/ProductDetailsPage/ProductDetailsPage";
import AllTopSelling from "./Pages/HomePage/Home/TopSelling/AllTopSelling/AllTopSelling";
import AllPremiumProduct from "./Pages/HomePage/Home/PremimumProduct/AllPremiumProduct/AllPremiumProduct";
import AllLatestDeals from "./Pages/HomePage/Home/LatestDeals/AllLatestDeals/AllLatestDeals";
import AllLatestProduct from "./Pages/HomePage/Home/LatestProduct/AllLatestProduct/AllLatestProduct";
import Login from "./Auth/Login/Login";
import Registration from "./Auth/Registration/Registration";
import WinnerStatics from "./Pages/HomePage/Home/WinnerStatics/WinnerStatics";
import OrderReview from "./Pages/HomePage/OrderReview/OrderReview";
import Payment from "./Pages/HomePage/Payment/Payment";
import AddCategory from "./Pages/Dashboard/CategoryPage/AddCategory/AddCategory";
import SubCategory from "./Pages/Dashboard/CategoryPage/SubCategory/SubCategory";
import ChildCategory from "./Pages/Dashboard/CategoryPage/ChildCategory/ChildCategory";
import AllUploadProduct from "./Pages/Dashboard/CategoryPage/AllUploadProduct/AllUploadProduct";
import UploadTopSelling from "./Pages/Dashboard/UploadTopSelling/UploadTopSelling";
import FooterDashboard from "./Pages/Dashboard/FooterDashboard/FooterDashbaord";

import AddBrand from "./Pages/Dashboard/CategoryPage/AddBrand/AddBrand";
import InvoicePage from "./Pages/Dashboard/UpdateOrder/InvoicePage/InvoicePage";
import MyOrders from "./Pages/Dashboard/UserDashboard/MyOrder/MyOrders";
import SuperAdmin from "./Pages/Dashboard/MakeAdmin/SuperAdmin";
import AllCouponDataShow from "./Pages/CouponPannelAdmin/AllCouponData/AllCouponDataShow";
import AllRevenuedata from "./Pages/Dashboard/AdminAllRevenue/AllRevenuedata/AllRevenuedata";
import ManageExpenseCategory from "./Pages/Dashboard/Expense/ManageExpenseCategory/ManageExpenseCategory";
import ExpenseManager from "./Pages/Dashboard/Expense/OverViewExpense/ExpenseManager";
import SalesReportAnalysis from "./Pages/Dashboard/SalesReportAnalysis/SalesReportAnalysis";
import AdminTopSellProductView from "./Pages/Dashboard/AdminTopSellProductView/AdminTopSellProductView";
import AllStockManagement from "./Pages/Dashboard/AdminDashboard/StockManegement/AllStockManagement/AllStockManagement";
import LowStock from "./Pages/Dashboard/AdminDashboard/StockManegement/LowStock/LowStock";
import StockOut from "./Pages/Dashboard/AdminDashboard/StockManegement/StockOut/StockOut";
import CategoryPartMobile from "./Pages/HomePage/Home/CategoryPartMobile/CategoryPartMobile";
import ChildCategoryPage from "./Pages/HomePage/Home/CategoryPartMobile/ChildCategoryPage";
import PrivateRoute from "./Pages/Shared/PrivetRoute/PrivetRoute";
import UserOverView from "./Pages/Dashboard/UserDashboard/UserOverView/UserOverView";
import ActiveCoupon from "./Pages/Dashboard/UserDashboard/UserOverView/ActiveCoupon/ActiveCoupon";
import TotalCoupons from "./Pages/Dashboard/UserDashboard/UserOverView/TotalCoupons/TotalCoupons";
import TotalWins from "./Pages/Dashboard/UserDashboard/UserOverView/TotalWins/TotalWins";
import Wallet from "./Pages/Dashboard/UserDashboard/UserOverView/Wallet/Wallet";
import Withdraw from "./Pages/Dashboard/UserDashboard/UserOverView/Withdraw/Withdraw";
import SupplierPage from "./Pages/Dashboard/AdminDashboard/SupplierForm/SupplierPage";
import SupplierList from "./Pages/Dashboard/AdminDashboard/SupplierForm/SupplierList/SupplierList";
import SupplierEdit from "./Pages/Dashboard/AdminDashboard/SupplierForm/SupplierEdit/SupplierEdit";
import SupplierPayment from "./Pages/Dashboard/AdminDashboard/SupplierForm/SupplierPayment/SupplierPayment";
import SupplierInvoice from "./Pages/Dashboard/AdminDashboard/SupplierForm/SupplierInvoice/SupplierInvoice";
import PurchaseEntry from "./Pages/Dashboard/AdminDashboard/SuppliePurchase/PurchaseEntry/PurchaseEntry";
import PurchaseList from "./Pages/Dashboard/AdminDashboard/SuppliePurchase/PurchaseList/PurchaseList";
import Noti from "./Pages/HomePage/Notifications/Noti";
import SendNotification from "./Pages/HomePage/Notifications/SendNotification";
import AdminSendNotification from "./Pages/Dashboard/AdminDashboard/AdminSendNotification/AdminSendNotification";
import About from "./Pages/About/About";
import TermsAndConditions from "./Pages/TermsAndConditions/TermsAndConditions";
import ContactUs from "./Pages/ContactUs/ContactUs";
import ShippingPolicy from "./Pages/ShippingPolicy/ShippingPolicy";
import WarrantyPolicy from "./Pages/WarrantyPolicy/WarrantyPolicy";
import BlogPage from "./Pages/BlogPage/BlogPage";
import FAQ from "./Pages/FAQ/FAQ";
import CustomerReviews from "./Pages/CustomerReviews/CustomerReviews";
import BrandList from "./Pages/BrandList/BrandList";
import AboutUsAdmin from "./Pages/Dashboard/AdminDashboard/AboutUsAdmin/AboutUsAdmin";
import ContactAdmin from "./Pages/Dashboard/AdminDashboard/ContactAdmin/ContactAdmin";
import ProductForm from "./Pages/TextEditor/Productfrom";
import TermsConditionAdmin from "./Pages/Dashboard/AdminDashboard/TermsConditionAdmin/TermsConditionAdmin";
import ShippingPolicyAdmin from "./Pages/Dashboard/AdminDashboard/ShippingPolicyAdmin/ShippingPolicyAdmin";
import FAQAdmin from "./Pages/Dashboard/AdminDashboard/FAQAdmin/FAQAdmin";
import PixelAdmin from "./Pages/Dashboard/AdminDashboard/PixelAdmin/PixelAdmin";
import AdminPromoSection from "./Pages/Dashboard/AdminDashboard/PromoSection/AdminPromoSection";
import AdminPromoCardSection from "./Pages/Dashboard/AdminDashboard/AdminPromoCardSection/AdminPromoCardSection";
import AdminPopularCategory from "./Pages/Dashboard/AdminDashboard/AdminPopularCategory/AdminPopularCategory";
import AdminCategoryBanner from "./Pages/Dashboard/AdminDashboard/AdminCategoryBanner/AdminCategoryBanner";
import AdminProductCarousel from "./Pages/Dashboard/AdminDashboard/AdminProductCarousel/AdminProductCarousel";
import AdminHomeBrand from "./Pages/Dashboard/AdminDashboard/AdminBarnd/AdminBrand";
import AdminBannerManager from "./Pages/Dashboard/AdminDashboard/AdminBannerManager/AdminBannerManager";
import UserWhiteList from "./Pages/Dashboard/UserDashboard/UserWhiteList";
import AdminLogin from "./Auth/Login/AdminLogin";
import AdminProtectedRoute from "./Pages/Dashboard/DashboardHome/AdminPrivateRoute/AdminPrivateRoute";
import BkashCallback from "./Pages/HomePage/Home/TopSelling/Bkash/BkashCallback";
import PaymentSuccess from "./Pages/HomePage/Home/TopSelling/Bkash/PaymentSuccess";
import PaymentFailure from "./Pages/HomePage/Home/TopSelling/Bkash/PaymentFailure";
import PaymentCancel from "./Pages/HomePage/Home/TopSelling/Bkash/PaymentCancel";
import AdminNavbarCategory from "./Pages/Dashboard/AdminDashboard/AdminNabarCategory/AdminNabarCategory";
import HomeBannerAdvertis from "./Pages/Dashboard/AdminDashboard/HomeBannerAdvertis/HomeBannerAdvertis";
import AdminWithdraw from "./Pages/Dashboard/AdminDashboard/AdminWithdrawData/AdminWithdrawData";
import ForgotPassword from "./Auth/ForgotPassword/ForgotPassword";
import ReferralList from "./Pages/Dashboard/UserDashboard/UserOverView/ReferralList/ReferralList";
import AdminReferral from "./Pages/Dashboard/AdminDashboard/AdminRefferal/AdminRefferal";
import CampaignPage from "./Pages/Dashboard/AdminDashboard/CampaignPage/CampaignPage";
import AdminWinnerDataShow from "./Pages/Dashboard/AdminDashboard/AdminWinnerdataShow/AdminWinnerDataShow";
import Campaign from "./Pages/Campain/Campain";
import CampaignProducts from "./Pages/Campain/CampaignProducts";
import PurchaseInvoicePage from "./Pages/Dashboard/AdminDashboard/SuppliePurchase/PurchaseList/PurchaseInvoice";
import CategoryWiseDiscount from "./Pages/Dashboard/AdminDashboard/CategorywiseDiscount/CategorywiseDiscount";
import MessageSender from "./Pages/Dashboard/AdminDashboard/MessageSender/MessageSender";
import AdminBadgePanel from "./Pages/Dashboard/AdminDashboard/AdminBadgePanel/AdminBadgePanel";
import RefferalRegistration from "./Auth/Registration/RefferalRegistration/RefferalRegistration";
import BulkSMSSender from "./Pages/Dashboard/AdminDashboard/MessageSender/BulkSMSSender/BulkSMSSender";
import BulkEmailSender from "./Pages/Dashboard/AdminDashboard/MessageSender/BulkEmailSender/BulkEmailSender";
import TrackOrder from "./Pages/Dashboard/AdminDashboard/TrackOrder/TrackOrder";
import PromoCodeUpdate from "./Pages/Dashboard/AdminDashboard/PromoCode/PromoCode";
import ShowProduct from "./Pages/Dashboard/CategoryPage/AllUploadProduct/ShowProduct/ShowProduct";
import RoleManager from "./Pages/Dashboard/MakeAdmin/RoleAdd/RoleAdd";
import FraudCheck from "./Pages/Dashboard/AdminDashboard/FraudCheck/FraudCheck";
import SellerUiPage from "./Pages/SellerShop/SellerUiPage/SellerUiPage";
import SellerShopCategoryProduct from "./Pages/SellerShop/SellerShopCategoryProduct/SellerShopCategoryProduct";
import SellerReview from "./Pages/SellerShop/SellerReview/SellerReview";
import SellerDashbaordView from "./Pages/Dashboard/SellerDashboard/SellerDashboardView/SellerDashboardView";
import SellerRegistration from "./Auth/SellerPannel/SellerRegistration/SellerRegistration";
import SellerLogin from "./Auth/SellerPannel/SellerLogin/SellerLogin";
import EditProfile from "./Pages/Dashboard/UserDashboard/MyOrder/EditProfile/EditProfile";
import AddAddressBook from "./Pages/Dashboard/UserDashboard/AddressBook/AddAddressBook/AddAddressBook";
import EditAddress from "./Pages/Dashboard/UserDashboard/AddressBook/AddAddressBook/EditAddress/EditAddress";
import AddNewAddress from "./Pages/Dashboard/UserDashboard/AddressBook/AddNewAddress/AddNewAddress";
import MyProfiles from "./Pages/Dashboard/UserDashboard/ProfileSetting/MyProfiles/MyProfiles";
import MyProfilePart from "./Pages/Dashboard/UserDashboard/ProfileSetting/MyProfiles/MyProfilepart";
import MyReturn from "./Pages/Dashboard/UserDashboard/MyOrder/MyReturn/MyReturn";
import MyCancellations from "./Pages/Dashboard/UserDashboard/MyOrder/MyCancellation/MyCancellation";
import ReturnDetails from "./Pages/Dashboard/UserDashboard/MyOrder/MyReturn/ReturnDetails/ReturnDetails";
import CancellationDetails from "./Pages/Dashboard/UserDashboard/MyOrder/MyCancellation/CancellationDetails/CancellationDetails";
import MyReviews from "./Pages/Dashboard/UserDashboard/MyReviews/MyReviews";
import MyReviewsHistory from "./Pages/Dashboard/UserDashboard/MyReviews/MyReviewHistory/MyReviewHistory";
import MyWishlist from "./Pages/Dashboard/UserDashboard/MyWishList/MyWishList";
import WriteReview from "./Pages/Dashboard/UserDashboard/MyReviews/WriteMyReview/WriteMyReview";
import FollowStore from "./Pages/Dashboard/UserDashboard/FollowStore/FollowStore";
import ManageAccount from "./Pages/Dashboard/UserDashboard/ManageAccount/ManageAccount";
import PromopartSection from "./Pages/PromopartSection/PromopartSection";
import PaymentOptions from "./Pages/Dashboard/UserDashboard/PaymentOption/PaymentOption";
import AccountInformation from "./Pages/Dashboard/UserDashboard/AccountInformation/AccountInformation";
import Settings from "./Pages/Dashboard/UserDashboard/Settings/Settings";
import Policy from "./Pages/Dashboard/UserDashboard/Policy/Policy";
import Feedback from "./Pages/Dashboard/UserDashboard/Feedback/Feedback";
import Message from "./Pages/Dashboard/UserDashboard/Message/Message";
// import SingleProduct from "./Pages/HomePage/ProductPage/ProductDetailsPage/SingleProduct/SingleProduct";
// import PrivateRoute from "./Pages/Shared/PrivetRoute/PrivetRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <>
       <ErrorPage/>
      </>
    ),
    children: [
     
      
      {
    path: "/",
    element: <Home />,
  },
//   {
//   path: "/productdetails",
//   element: <ProductDetailsPage />,
// },
  {
  path: "/productdetails/:title",
  element: <ProductDetailsPage />,
},

  {
    path: "/alltopselling",
    element: <AllTopSelling />,
  },
 
  {
    path: "/allpremiumproduct",
    element: <AllPremiumProduct />,
  },
  {
    path: "/alllatestdeals",
    element: <AllLatestDeals/>,
  },
  {
    path: "/alllatestproducts",
    element: <AllLatestProduct />,
  },
  {
    path: "/category/:categoryName",
    element: <AllLatestProduct />,
  },
  {
    path: "/category/:categoryName/:subcategoryName",
    element: <AllLatestProduct />,
  },
  {
    path: "/category/:categoryName/:subcategoryName/:childcategoryName",
    element: <AllLatestProduct />,
  },
  {
    path: "/brand/:brandName",
    element: <AllLatestProduct />,
  },
  {
    path: "/product-search/:searchTerm",
    element: <AllLatestProduct />,
  },
  {
    path: "/search/:searchTerm",
    element: <AllLatestProduct />,
  },
  {
    path: "/orderreview",
    element: <OrderReview/>,
  },
  {
    path: "/promopart",
    element: <PromopartSection/>,
  },
  {
    path: "/campain",
    element: <Campaign/>,
  },
  {
    path: "/campaigns/:campaignId",
    element: <CampaignProducts/>,
  },
 
  {
    path: "/about",
    element: <About/>,
  },
  {
    path: "/termsconditions",
    element: <TermsAndConditions/>,
  },
  {
    path: "/contactus",
    element: <ContactUs/>,
  },
  {
    path: "/shippingpolicy",
    element: <ShippingPolicy/>,
  },
  {
    path: "/warrantypolicy",
    element: <WarrantyPolicy/>,
  },
  {
    path: "/blog",
    element: <BlogPage/>,
  },
  {
    path: "/faq",
    element: <FAQ/>,
  },
  {
    path: "/customerreview",
    element: <CustomerReviews/>,
  },
  {
    path: "/brandlist",
    element: <BrandList/>,
  },
  {
    path: "/categorypartmobile",
    element: <CategoryPartMobile/>,
  },
  {
    path: "/subcategory/:name",
    element: <ChildCategoryPage/>,
  },
  {
    path: "/payment",
    element: 
    // <PrivateRoute>
       <Payment />
    // </PrivateRoute>
  },
  {
    path: "/winnerstatics",
    element: <WinnerStatics />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sellershop",
    element: <SellerUiPage />,
  },
  {
    path: "/sellershop-category",
    element: <SellerShopCategoryProduct />,
  },
  {
    path: "/seller-review",
    element: <SellerReview />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/newregister",
    element: <RefferalRegistration />,
  },
 
  {
    path: "/noti",
    element: <Noti />,
  },
  {
    path: "/forgetpassword",
    element: <ForgotPassword />,
  },
 
  {
    path: "/sendnoti",
    element: <SendNotification />,
  },
  
  {
    path: "/ff",
    element: <ProductForm />,
  },
  
  {
            path: "/sellerview",
            element: <SellerDashbaordView />,
          },
  {
            path: "/sellerRegistration",
            element: <SellerRegistration />,
          },
  {
            path: "/sellerLogin",
            element: <SellerLogin />,
          },
  // {
  //   path: "/bkash",
  //   element: <Bkash />,
  // },
  // {
  //   path: "/bkash/callback",
  //   element: <BkashCallback />,
  // },
 
     
     { path: "/admin/login", element: <AdminLogin /> },
      {
            path: "/bkash/callback",
            element: <BkashCallback />,
          },
          {
            path: "/payment-success",
            element: <PaymentSuccess />,
          },
          {
            path: "/payment-failure",
            element: <PaymentFailure />,
          },
          {
            path: "/payment-cancel",
            element: <PaymentCancel />,
          },
     
   
    
     
      // {
      //   path:"bookDetails/:id",
      //   element: <ProductDetails />,
      // },
   
     
      
      // {
      //   path: "/category/:categoryName",
      //   element: <CategoryPage />,
      // },
     

        ],
      },



   

      {
        path: "/dashboard",
        element: (
          //  <PrivateRoute>
            <Dashboard />
          //  </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard",
            element: 
            // <AdminProtectedRoute>
              <DashboardHome />
            // </AdminProtectedRoute>
         
          },
          {
            path: "/dashboard/makeadmin",
            element: <MakeAdmin />,
          },
         
         
         
          {
            path: "/dashboard/myprofile",
            element: <MyProfilePart />,
          },
        
          {
            path: "/dashboard/useroverview",
            element: <UserOverView />,
          },
          {
            path: "/dashboard/paymentoption",
            element: <PaymentOptions />,
          },
          {
            path: "/dashboard/accountinformation",
            element: <AccountInformation />,
          },
          {
            path: "/dashboard/settings",
            element: <Settings />,
          },
          {
            path: "/dashboard/policy",
            element: <Policy />,
          },
          {
            path: "/dashboard/feedback",
            element: <Feedback />,
          },
          {
            path: "/dashboard/message",
            element: <Message />,
          },
          
          {
            path: "/dashboard/activecoupon",
            element: <ActiveCoupon />,
          },
           {
    path: "/dashboard/editprofile",
    element: <EditProfile />,
  },
           {
    path: "/dashboard/addressbook",
    element: <AddAddressBook />,
  },
           {
    path: "/dashboard/editaddress",
    element: <EditAddress />,
  },
           {
    path: "/dashboard/addnewaddress",
    element: <AddNewAddress />,
  },
          {
            path: "/dashboard/totalcoupon",
            element: <TotalCoupons />,
          },
          {
            path: "/dashboard/totalwins",
            element: <TotalWins />,
          },
          {
            path: "/dashboard/wallet",
            element: <Wallet />,
          },
          {
            path: "/dashboard/trackorders",
            element: <TrackOrder />,
          },
          {
            path: "/dashboard/withdraw",
            element: <Withdraw />,
          },
          {
            path: "/dashboard/refferallist",
            element: <ReferralList />,
          },
         
        
        
          {
            path: "/dashboard/myorder",
            element: <MyOrders />,
          },
          {
            path: "/dashboard/myreturn",
            element: <MyReturn />,
          },
          {
            path: "/dashboard/mycancellation",
            element: <MyCancellations />,
          },
          {
            path: "/dashboard/returndetails",
            element: <ReturnDetails />,
          },
          {
            path: "/dashboard/canceldetails",
            element: <CancellationDetails />,
          },
          {
            path: "/dashboard/myreviews",
            element: <MyReviews />,
          },
          {
            path: "/dashboard/myreviewshistory",
            element: <MyReviewsHistory />,
          },
          {
            path: "/dashboard/mywishlist",
            element: <MyWishlist />,
          },
          {
            path: "/dashboard/writereview",
            element: <WriteReview />,
          },
          {
            path: "/dashboard/followstore",
            element: <FollowStore />,
          },
          {
            path: "/dashboard/manageaccount",
            element: <ManageAccount />,
          },
         
        
          {
            path: "/dashboard/userwhitelist",
            element: <UserWhiteList />,
          },
         
          {
            path: "/dashboard/invoice/:paymentId",
            element: <InvoicePage />,
          },
          
        
         
          
         
        
          

          // supplierpage 
          
         
    
    ],
  },

  {
  path: "/admin/dashboard",
  element: (
    <AdminProtectedRoute>
      <Dashboard />
    </AdminProtectedRoute>
  ),
  children: [
    {
      path: "/admin/dashboard",
      element: <DashboardHome />,
    },
     {
            path: "/admin/dashboard/addcategory",
            element: <AddCategory />,
          },
           {
            path: "/admin/dashboard/subcategory",
            element: <SubCategory />,
          },
          {
            path: "/admin/dashboard/childcategory",
            element: <ChildCategory />,
          },

           {
            path: "/admin/dashboard/alluploadproduct",
            element: <AllUploadProduct />,
          },
          {
            path: "/admin/dashboard/adminbarnd",
            element: <AdminHomeBrand />,
          },
          {
            path: "/admin/dashboard/adminshowcategory",
            element: <AdminBannerManager />,
          },
          {
            path: "/admin/dashboard/adminalldatawithdraw",
            element: <AdminWithdraw />,
          },
          {
            path: "/admin/dashboard/uploadtopselling",
            element: <UploadTopSelling />,
          },
          {
            path: "/admin/dashboard/adminproductcarousel",
            element: <AdminProductCarousel />,
          },
          {
            path: "/admin/dashboard/adminrefferallist",
            element: <AdminReferral />,
          },
          {
    path: "/admin/dashboard/rolemanager",
    element: <RoleManager />,
  },
          {
            path: "/admin/dashboard/footerdashboard",
            element: <FooterDashboard />,
          },
            {
            path: "/admin/dashboard/addbrand",
            element: <AddBrand />,
          },
          {
            path: "/admin/dashboard/subadmin",
            element: <SubAdmin />,
          },
          {
            path: "/admin/dashboard/useralldata",
            element: <UserAllData />,
          },
          {
            path: "/admin/dashboard/aboutadmin",
            element: <AboutUsAdmin />,
          },
          {
            path: "/admin/dashboard/homecategorynavbar",
            element: <AdminNavbarCategory />,
          },
          {
            path: "/admin/dashboard/homebanneradvertis",
            element: <HomeBannerAdvertis />,
          },
          {
            path: "/admin/dashboard/contactadmin",
            element: <ContactAdmin />,
          },
          {
            path: "/admin/dashboard/adminbadge",
            element: <AdminBadgePanel />,
          },
          {
            path: "/admin/dashboard/categorydiscount",
            element: <CategoryWiseDiscount />,
          },
          {
            path: "/admin/dashboard/bulksms",
            element: <BulkSMSSender />,
          },
          {
            path: "/admin/dashboard/trackorder",
            element: <TrackOrder />,
          },
          {
            path: "/admin/dashboard/bulkemail",
            element: <BulkEmailSender />,
          },
          {
            path: "/admin/dashboard/pendingproduct",
            element: <PendingProduct />,
          },
         
          {
            path: "/admin/dashboard/updateorder",
            element: <UpdateOrder />,
          },
            {
            path: "/admin/dashboard/AllUserorder",
            element: <AllUserOrder />,
          },
          {
            path: "/admin/dashboard/allproductshows",
            element: <AllProductShow />,
          },
          {
            path: "/admin/dashboard/promocode",
            element: <PromoCodeUpdate />,
          },
          {
            path: "/admin/dashboard/showallproduct",
            element: <ShowProduct />,
          },
          {
            path: "/admin/dashboard/fraudcheck",
            element: <FraudCheck />,
          },
          {
            path: "/admin/dashboard/sendnotifications",
            element: <AdminSendNotification />,
          },
          {
            path: "/admin/dashboard/messagesender",
            element: <MessageSender />,
          },
          {
            path: "/admin/dashboard/showproducts",
            element: <GetProduct />,
          },
          {
            path: "/admin/dashboard/productupload",
            element: <ProductUpload />,
          },
          {
            path: "/admin/dashboard/pixel",
            element: <PixelAdmin />,
          },
           {
            path: "/admin/dashboard/admintermcondition",
            element: <TermsConditionAdmin />,
          },
          {
            path: "/admin/dashboard/adminshippingpolicys",
            element: <ShippingPolicyAdmin />,
          },
          {
            path: "/admin/dashboard/faqadmin",
            element: <FAQAdmin />,
          },
          {
            path: "/admin/dashboard/superadmin",
            element: <SuperAdmin />,
          },
          {
            path: "/admin/dashboard/allcoupondata",
            element: <AllCouponDataShow />,
          },
          {
            path: "/admin/dashboard/allrevenue",
            element: <AllRevenuedata />,
          },

            {
            path: "/admin/dashboard/manageexpense",
            element: <ManageExpenseCategory />,
          },
          {
            path: "/admin/dashboard/expensemanager",
            element: <ExpenseManager />,
          },
          {
            path: "/admin/dashboard/reportanalysis",
            element: <SalesReportAnalysis />,
          },
          {
            path: "/admin/dashboard/topsellproductview",
            element: <AdminTopSellProductView />,
          },
          {
            path: "/admin/dashboard/allstockmanagement",
            element: <AllStockManagement />,
          },
          {
            path: "/admin/dashboard/lowstock",
            element: <LowStock />,
          },
          {
            path: "/admin/dashboard/stockout",
            element: <StockOut />,
          },
          {
            path: "/admin/dashboard/adminpromo",
            element: <AdminPromoSection />,
          },
           {
    path:"/admin/dashboard//purchase/:id",
    element: <PurchaseInvoicePage/>,
  },
          {
            path: "/admin/dashboard/adminpromocard",
            element: <AdminPromoCardSection />,
          },
          {
            path: "/admin/dashboard/adminpopularcategory",
            element: <AdminPopularCategory />,
          },
           {
            path: "/admin/dashboard/admincategorybanner",
            element: <AdminCategoryBanner />,
          },
           {
            path: "/admin/dashboard/getFooter",
            element: <GetFooter />,
          },
          // {
          //   path: "/dashboard/getnavber",
          //   element: <GetNavber />,
          // },
          {
            path: "/admin/dashboard/bannerpost",
            element: <BannerPost />,
          },
        
          {
            path: "/admin/dashboard/editbanners/:id",
            element: <EditBanners/>,
          },
          {
            path: "/admin/dashboard/editnavber/:id",
            element: <EditNavber/>,
          },
          {
            path: "/admin/dashboard/editfooter/:id",
            element: <EditFooter/>,
          },

          {
            path: "/admin/dashboard/editproductdatas/:id",
            element: <EditProduct/>,
          },
          {
            path: "/admin/dashboard/addsupplier",
            element: <SupplierPage/>,
          },
          {
            path: "/admin/dashboard/campain",
            element: <CampaignPage/>,
          },
          {
            path: "/admin/dashboard/adminwinnerdata",
            element: <AdminWinnerDataShow/>,
          },
          {
            path: "/admin/dashboard/supplier",
            element: <SupplierList/>,
          },
          {
            path: "/admin/dashboard/purchaseentry",
            element: <PurchaseEntry/>,
          },
          {
            path: "/admin/dashboard/purchaselist",
            element: <PurchaseList/>,
          },
          {
            path: "/admin/dashboard/supplier/edit/:id",
            element: <SupplierEdit/>,
          },
          {
            path: "/admin/dashboard/supplier/payment/:id",
            element: <SupplierPayment/>,
          },
          {
            path: "/admin/dashboard/supplier/invoice/:id",
            element: <SupplierInvoice/>,
          },
          {
            path: "/admin/dashboard/invoice/:paymentId",
            element: <InvoicePage />,
          },
  ],
},
]);
export default router;
