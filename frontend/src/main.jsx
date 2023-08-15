import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/styles/index.css";
import "./assets/styles/bootstrap.custom.css";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { HelmetProvider } from "react-helmet-async";
import store from "./store.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen.jsx";
import ProductScreen from "./screens/productScreen.jsx";
import CartScreen from "./screens/CartScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ShippingScreen from "./screens/ShippingScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import PaymentScreen from "./screens/PaymentScreen.jsx";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.jsx";
import OrderScreen from "./screens/OrderScreen.jsx";
import ProfileScreen from "./screens/user/ProfileScreen.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import OrderListScreen from "./screens/admin/OrderListScreen.jsx";
import ProductListScreen from "./screens/admin/ProductListScreen.jsx";
import ProductEditScreen from "./screens/admin/ProductEditScreen.jsx";
import UserListScreen from "./screens/admin/UserListScreen.jsx";
import UserEditScreen from "./screens/admin/UserEditScreen.jsx";
import UserOrdersScreen from "./screens/user/UserOrdersScreen.jsx";
import UserSideMenu from "./components/UI/UserSideMenu.jsx";
import SliderListScreen from "./screens/admin/settings/SliderListScreen.jsx";
import SliderCreateScreen from "./screens/admin/settings/SliderCreateScreen.jsx";
import "react-quill/dist/quill.snow.css";
import ScrollToTop from "./components/ScrollToTop.jsx";
import PageListScreen from "./screens/admin/pages/PageListScreen.jsx";
import PageCreateScreen from "./screens/admin/pages/PageCreateScreen.jsx";
import PageScreen from "./screens/PageScreen.jsx";
import PageEditScreen from "./screens/admin/pages/PageEditScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/search/:keyword" element={<HomeScreen />} />
      <Route path="/page/:pageNumber" element={<HomeScreen />} />
      <Route
        path="/search/:keyword/page/:pageNumber"
        element={<HomeScreen />}
      />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/pages/:id" element={<PageScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="" element={<UserSideMenu />}>
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/myorders" element={<UserOrdersScreen />} />
        </Route>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
        <Route path="/admin/productlist" element={<ProductListScreen />} />
        <Route
          path="/admin/productlist/:pageNumber"
          element={<ProductListScreen />}
        />
        <Route path="admin/product/:id/edit" element={<ProductEditScreen />} />
        <Route path="admin/userlist" element={<UserListScreen />} />
        <Route path="admin/user/:id/edit" element={<UserEditScreen />} />
        <Route path="admin/settings/slider" element={<SliderListScreen />} />
        <Route
          path="admin/settings/slider/create"
          element={<SliderCreateScreen />}
        />

        <Route path="admin/pages" element={<PageListScreen />} />
        <Route path="admin/pages/create" element={<PageCreateScreen />} />
        <Route path="admin/page/:id/edit" element={<PageEditScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
