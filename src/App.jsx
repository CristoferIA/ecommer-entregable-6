import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import { getAllProducts } from "./store/slices/products.slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Navbar from "./pages/Navbar";
import { Route, Routes } from "react-router-dom";
import { getUserCart } from "./store/slices/cart.slice";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import User from "./pages/User";
import Cart from "./pages/Cart";
import Footer from "./pages/Footer";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import ProductInfo from "./pages/ProductInfo";
import Purchases from "./pages/Purchases";


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getUserCart());
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        
        <Route path="login" element={<Login />} />
        <Route path="user" element={<User />} />
        <Route path="singup" element={<Singup />} />
        <Route path="/" element={<Home />} />
        <Route path="product/:id" element={<ProductInfo/>} />

        <Route element={<ProtectedRoutes/>}>
          <Route path="/purchases" element={<Purchases/>}/>          
        </Route>  
                      
      </Routes> 
      <Footer/>     
      <Cart/>      
    </div>
  );
}

export default App;
