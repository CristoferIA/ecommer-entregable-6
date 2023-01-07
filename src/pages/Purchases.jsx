import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../public/css/purchases.css";
import getConfig from "../utils/getConfig";
import PurchaseItem from "../components/purchases/PurchaseItem";

const Purchases = () => {
  
  
  const [purchases, setPurchases] = useState([]);
  useEffect(() => {
    const URL = "https://e-commerce-api.academlo.tech/api/v1/purchases";
    axios
      .get(URL, getConfig())
      .then((res) => {
        setPurchases(res.data.data.purchases);
      })
      .catch((err) => console.log(err));
  }, []);
  
  return (
    <div className="purchases">
      <div className="productInfo__header">
        <ul>
          <li>
            <Link className="back" to="/">
              Home
            </Link>
          </li>
          <li>{">"}</li>
          <li>purchases</li>
        </ul>
      </div>
      <h1>My purchases</h1>
      <div className="purchases__container">
        {purchases?.map((purchase) => (
          
            <PurchaseItem key={purchase.id} purchase={purchase}/>
          
        ))}
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Purchases;
