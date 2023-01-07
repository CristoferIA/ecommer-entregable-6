import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserCart } from "../../store/slices/cart.slice";
import getConfig from "../../utils/getConfig";
import "./cartItem.css";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    const URL = `https://e-commerce-api.academlo.tech/api/v1/cart/${product.id}`;
    axios
      .delete(URL, getConfig())
      .then((res) => {
        console.log(res.data);
        dispatch(getUserCart());
      })
      .catch((err) => console.log(err));
  };
  const handlePlus = () => {
    updateQuantity(product.productsInCart.quantity+1)
  };
  const handleMinus = () => {
    if (product.productsInCart.quantity > 1) {    
      updateQuantity(product.productsInCart.quantity-1)
    }
  };
  const updateQuantity = (quantity)=>{
    const URL = 'https://e-commerce-api.academlo.tech/api/v1/cart'
    const data = {
      id: product.id,
      newQuantity: quantity
    }
    axios.patch(URL, data, getConfig())
    .then(res=>{
      console.log(res.data);
      dispatch(getUserCart());
    })
    .catch(err=>console.log(err))
  }
  return (
    <div className="cartItem">
      <div className="CartItem__container">
        <div className="cartItem__description">
          <div className="cartItem__brand">{product.brand}</div>
          <div className="cartItem__title">{product.title}</div>
          <div className="cartItem__quantity">
            <p>quantity:</p>
            <div>
              <button onClick={handleMinus}>-</button>
              <span>{product.productsInCart.quantity}</span>
              <button onClick={handlePlus}>+</button>
            </div>
          </div>
          <div className="cartItem__unit">
            <span>Unit:</span>
            <p>$ {product.price}</p>
          </div>
        </div>
        <div className="cartItem__delete">
          <button onClick={handleDelete}>
            <i className="far fa-trash-alt"></i>
          </button>
        </div>
      </div>

      <div className="cartItem__total">
        <span>Total:</span>
        <p>$ {(product.price * product.productsInCart.quantity).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartItem;
