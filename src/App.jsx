import React,{ useState,useEffect } from 'react'
import { BrowserRouter , HashRouter, Route, Routes,Link } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import './App.css'
import AddProduct from './components/product/AddProduct'
import ExistingProduct from './components/product/ExistingProduct'
import EditProduct from './components/product/EditProduct'
import Home from './components/home/Home'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import ProductListing from './components/product/ProductListing'
import ViewSingleProduct from './components/product/ViewSingleProduct'
import ShoppingCart from './components/product/ShoppingCart';
import Admin from './components/admin/Admin';
import Purchase from './components/order/Purchase';
import PurchaseDetails from './components/order/PurchaseDetails';
import { CartProvider } from './components/cart/CartContext';
import ExistingOrder from './components/order/ExistingOrder';
import ExistingOrderDetails from './components/order/ExistingOrderDetails';
import Login from './components/auth/Login';
import { AuthProvider } from "./components/auth/AuthProvider"
import RequireAuth from './components/auth/RequireAuth';


function App() {
 
  return (
  <AuthProvider>
  <CartProvider>
    <main>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/edit-product/:productId" element={<EditProduct />}/>
          <Route path="/existing-product" element={<ExistingProduct />}/>
          <Route path="/add-product" element={<AddProduct />}/>
          <Route path="/browse-all-products" element={<ProductListing />} />
          <Route path="/view-product/:productId" element={<ViewSingleProduct />} />
          {/* <Route path="/shopping-cart" element={<ShoppingCart />} /> */}
          <Route
							path="/shopping-cart"
							element={
								<RequireAuth>
									<ShoppingCart />
								</RequireAuth>
							}
						/>
          <Route path="/admin" element={<Admin />} />
          <Route path="/my-purchase" element={<Purchase />} />
          <Route path="/purchase-details" element={<PurchaseDetails />} />
          <Route path="/existing-orders" element={<ExistingOrder />} />
          <Route path="/order-details" element={<ExistingOrderDetails />} />
          <Route path="/login-page" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </main>
    {/* <ExistingProduct/>
    <AddProduct/> */}
  </CartProvider>
  </AuthProvider>
  
  )
}

export default App
