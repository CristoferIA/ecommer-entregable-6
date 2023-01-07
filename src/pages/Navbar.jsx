import React from "react";
import "../../public/css/navbar.css";
import { BiUser } from "react-icons/bi";
import { FiArchive } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartItems = useSelector((state)=>state.cart)
  const navigate = useNavigate();
  const cart = () => {

    if (localStorage.getItem('token')) {
      const cart = document.querySelector('.cart')
    cart.classList.toggle('cart-none')
    }else{
      navigate('login')
    }    
  };
  const totalCart = cartItems?.length;
  let resTotal = ''
  if (totalCart > 0){
    resTotal = (<div className="total-products-cart">{totalCart}</div>)
  }
  const useLogi=()=>{
    navigate('/login')
  }
  const purcahses=()=>{
    navigate('/purchases')
  }
  return (
    <nav className="nav">
      <div className="nav__container">
        <div className="nav__logo">
          <Link className="Link" to="/">
            e-commerce
          </Link>
        </div>
        <div className="nav__options">
          <ul>
            <li onClick={useLogi}>
              {" "}
              <BiUser />{" "}
            </li>
            <li onClick={purcahses}>
              {" "}
              <FiArchive />{" "}
            </li>
            <li onClick={cart}>
              {" "}
              <AiOutlineShoppingCart />{" "}
              {resTotal}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
