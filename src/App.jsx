import React from "react";
import {Routes, Route} from "react-router-dom";
import "./App.css";
import { CartProvider } from "./hooks/useCart";
import {useAuth0 } from "@auth0/auth0-react";
import HomePage from "./pages/HomePage";
import ItemPage from "./pages/ItemPage";
import SearchPage from "./pages/SearchPage";
import AdminPage from "./pages/AdminPage";
import AdminItemPage from "./pages/AdminItemPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import ProductsPage from "./pages/ProductsPage";
import SuccessPage from "./pages/SuccessPage";
import ProtectedRoute from "./auth/ProtectedRoute";
const App = () => {

  const { isLoading, error} = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }
  
// document.querySelector('div[data-lastpass-root]:not([value=""])').style.display= 'none'

    return (
      <>
          <CartProvider>
            <Routes>
              {/* Routes for admin interface */}
                <Route path = "/admin" element={<ProtectedRoute component={AdminPage}/>}>
                  <Route index element={<AdminProductsPage />} />
                  <Route path="products" element={<AdminProductsPage />} />
                  <Route path="products/:id" element={<AdminItemPage />} />
                  <Route path="orders" element={<AdminOrdersPage />} />
                </Route>
                {/* Routes for storefront */}
                <Route path="/" element={<HomePage />}>
                  <Route index element={<ProductsPage/>} />
                  <Route path="products/:id" element={<ItemPage />} />
                  <Route path="search" element={<SearchPage />} />
                  <Route path="success" element={<SuccessPage />} />
                </Route>
            </Routes>
          </CartProvider>
      </>
    );
};

export default App;
