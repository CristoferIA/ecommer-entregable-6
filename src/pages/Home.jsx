import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardProduct from "../components/home/CardProduct";
import "../../public/css/home.css";
import { BsSearch } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import ProductFilter from "../components/home/ProductFilter";
import ImSorry from "../components/home/ImSorry";

const Home = () => {
  const products = useSelector((state) => state.products);
  const [priceFilter, setPriceFilter] = useState({
    from: 0,
    to: Infinity,
  });
  const [productsFilter, setProductsFilter] = useState();
  const [inputValues, setInputValues] = useState("");

  useEffect(() => {
    if (products) {
      setProductsFilter(products);
    }
  }, [products]);

  const btn_filter = () => {
    const form_filter = document.querySelector(".Product__filter");
    form_filter.classList.toggle("Product__filter-display");
    //console.log(form_filter);
  };

  const handleChange = (e) => {
    const inputSearch = e.target.value.toLowerCase().trim();
    const filter = products?.filter((product) =>
      product.title.toLowerCase().includes(inputSearch)
    );
    setProductsFilter(filter);
    setInputValues(e.target.value);
  };
  const filterCallback = (product) =>
    +product.price >= priceFilter.from && +product.price <= priceFilter.to;
  return (
    <div className="App__container">
      <div className="Product">
        <div className="Product__filter">
          
          <div className="filter">
          <h1 className="filter__close">
          <button onClick={btn_filter}><i className="fas fa-times"></i></button>
          </h1>
            <ProductFilter
              setPriceFilter={setPriceFilter}
              setInputValues={setInputValues}
            />
          </div>
        </div>
        <div className="Product__container">
          <div className="Product__search">
            <div className="Product__search-options">
              <input
                value={inputValues}
                autoComplete="of"
                placeholder="What are you looking for?"
                type="text"
                id="inputSearch"
                onChange={handleChange}
              />
              <button>
                {" "}
                <BsSearch />{" "}
              </button>
            </div>
            <div className="Product__search-filter" onClick={btn_filter}>
              <FiFilter className="btn-filter" />
              <span>Filter</span>
            </div>
          </div>
          <div className="Product__result">
            {productsFilter?.filter(filterCallback).length > 0 ? (
              productsFilter
                ?.filter(filterCallback)
                .map((product) => (
                  <CardProduct key={product.id} product={product} />
                ))
            ) : (
              <ImSorry inputValues={inputValues}/>
            )}
          </div>
        </div>        
      </div>
    </div>    
  );
};

export default Home;
