import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/landing";
import MenuPage from "../pages/menu";
import OrderPage from "../pages/order";
import ContactPage from "../pages/contact";
import InvoicePage from "../pages/invoice";
import OrderSummaryPage from "../pages/orderSummary";
import PaymentMethodPage from "../pages/paymentMethod";
import CompletePage from "../pages/complete";
import CmsPage from "../pages/cms";
import CmsLoginPage from "../pages/cms/login";
import CmsProductPage from "../pages/cms/product";
import CmsUserPage from "../pages/cms/user";
import CmsCategoryPage from "../pages/cms/category";
import CmsRestaurantPage from "../pages/cms/restaurant";
import RedirectPage from "../pages/redirect";
import FinishPage from "../pages/finish";
import CmsOrderPage from "../pages/cms/order";
import HistoryPage from "../pages/history";
import AboutPage from "../pages/about";
import CartPage from "../pages/cart";

function Index() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/invoice/:id" element={<InvoicePage />} />
      <Route path="/order-summary" element={<OrderSummaryPage />} />
      <Route path="/payment-method" element={<PaymentMethodPage />} />
      <Route path="/payment" element={<RedirectPage />} />
      <Route path="/complete" element={<CompletePage />} />
      <Route path="/finish" element={<FinishPage />} />
      <Route path="/cms" element={<CmsPage />} />
      <Route path="/cms/login" element={<CmsLoginPage />} />
      <Route path="/cms/product" element={<CmsProductPage />} />
      <Route path="/cms/user" element={<CmsUserPage />} />
      <Route path="/cms/category" element={<CmsCategoryPage />} />
      <Route path="/cms/restaurant" element={<CmsRestaurantPage />} />
      <Route path="/cms/order" element={<CmsOrderPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
}

export default Index;
