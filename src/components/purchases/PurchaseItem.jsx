import React from "react";
import "../../../public/css/purchases.css";
import { useNavigate } from "react-router-dom";

const PurchaseItem = ({ purchase }) => {
    const navigate = useNavigate()
    const datePurchase = new Date(purchase.createdAt)
    const handleClick = (id)=>{
        navigate(`/product/${id}`)
      }
  return (
    <div key={purchase.id} className="purchases__item">
      <div className="purchases__item-header">{datePurchase.toLocaleDateString()}</div>
      <div className="purchases__item-container">
        <ul>
          {purchase?.cart.products.map((product) => (
            <li
              key={product.id}
              onClick={() => {
                handleClick(product.id);
              }}
            >
              <div>{product.title}</div>
              <div>
                {" "}
                <p>{product.productsInCart.quantity}</p>{" "}
              </div>
              <div>
                ${" "}
                {(+product.price * +product.productsInCart.quantity).toFixed(2)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PurchaseItem;
