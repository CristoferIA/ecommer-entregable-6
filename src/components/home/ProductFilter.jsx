import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getAllProductsCategory,
  getAllProducts,
} from "../../store/slices/products.slice";
import "./productFilter.css";
import { ascendingOrderProducts, descendingOrderProducts } from "../../store/slices/products.slice";

const ProductFilter = ({ setPriceFilter, setInputValues }) => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState();
  useEffect(() => {
    const URL =
      "https://e-commerce-api.academlo.tech/api/v1/products/categories";
    axios
      .get(URL)
      .then((res) => {
        setCategories(res.data.data.categories);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const from = e.target.from_price.value;
    const to = e.target.to_price.value;
    if (from && to) {
      setPriceFilter({
        from: from,
        to: to,
      });
    } else if (!from && to) {
      setPriceFilter({
        from: 0,
        to: to,
      });
    } else if (from && !to) {
      setPriceFilter({
        from: from,
        to: Infinity,
      });
    } else {
      setPriceFilter({
        from: 0,
        to: Infinity,
      });
    }
  };

  const handleCategory = (id_category) => {
    dispatch(getAllProductsCategory(id_category));
    setInputValues("")
  };
  const handleAllCategory = () => {
    dispatch(getAllProducts());
    setInputValues("")
  };

  
    const handleAscending = ()=>{
        dispatch(ascendingOrderProducts())
        
    }
    const handleDescending = ()=>{
        dispatch(descendingOrderProducts())
    }

  return (
    <>
      <div className="Product__price">
        <div className="Product__header-price">
          <h3>Price</h3>
          <button className="btn_mini">
            <i className="fas fa-chevron-down"></i>
          </button>
        </div>
        <div className="Product__filter-options">
          <form onSubmit={handleSubmit}>
            <table >
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="from_price">From: </label>
                  </td>
                  <td>
                    <input id="from_price" type="number" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="to_price">To: </label>
                  </td>
                  <td>
                    <input id="to_price" type="number" />
                  </td>
                </tr>
                <tr>
                  <td className="filter__btn" colSpan={2}>
                    <button>Filter price</button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>Filter price:</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <div className="btn-filter-price">
                      <button onClick={handleDescending}>Price desc</button>
                      <button onClick={handleAscending}>Price asc</button>
                    </div>
                    
                    </td>                 
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
      <div className="Product__category">
        <div className="Product__header-category">
          <h3>Category</h3>
          <button className="btn_mini">
            <i className="fas fa-chevron-down"></i>
          </button>
        </div>
        <div className="Product__filter-options">
          <ul>
            <li onClick={handleAllCategory}>All Products</li>
            {categories?.map((category) => (
              <li
                onClick={() => {
                  handleCategory(category.id);
                }}
                key={category.id}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProductFilter;
