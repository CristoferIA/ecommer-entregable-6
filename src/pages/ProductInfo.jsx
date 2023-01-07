import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../public/css/productInfo.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import axios from "axios";
import getConfig from "../utils/getConfig";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../store/slices/cart.slice";
import CardProduct from "../components/home/CardProduct";

const ProductInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [nextImg, setNextImg] = useState(0);
  const [counter, setCounter] = useState(1);
  const [category, setCategory] = useState();
  const [simillarProduct, setSimillarProduct] = useState();
  const allProducts = useSelector((state) => state.products);

  useEffect(() => {
    const URL = `https://e-commerce-api.academlo.tech/api/v1/products/${id}`;
    axios
      .get(URL, getConfig())
      .then((res) => {
        setProduct(res.data.data.product);
        setCategory(res.data.data.product.category);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (category && allProducts) {
      const pivot = allProducts.filter(
        (prod) => prod.category.name === product.category
      );
      setSimillarProduct(pivot);
    }
  }, [allProducts, product]);

  const styleImg = {
    transform: `translateX(-${nextImg}%)`,
  };
  const handleNext = () => {
    const maxLength = product?.productImgs.length * 100 - 100;
    if (maxLength) {
      if (nextImg < maxLength) {
        setNextImg(nextImg + 100);
      } else {
        setNextImg(0);
      }
    }
  };
  const handleBackt = () => {
    const maxLength = product?.productImgs.length * 100 - 100;
    if (nextImg > 0) {
      setNextImg(nextImg - 100);
    } else {
      setNextImg(maxLength);
    }
  };
  const handleBtnIng = (index) => {
    setNextImg(index * 100);
  };
  const handleNextCounter = () => {
    setCounter(counter + 1);
  };
  const handleMinustCounter = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };
  const addToCart = (idProduct) => {
    const URL = "https://e-commerce-api.academlo.tech/api/v1/cart";
    const data = {
      id: idProduct,
      quantity: counter,
    };
    axios
      .post(URL, data, getConfig())
      .then((res) => {
        console.log(res.data);
        dispatch(getUserCart());
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  };

  return (
    <div className="productInfo">
      <div className="productInfo__header">
        <ul>
            <li><Link className="back" to='/'>Home</Link></li>
            <li>{'>'}</li>
            <li>{product?.title}</li>
        </ul>
      </div>
      <div className="productInfo__container">
        <div className="productInfo__images">
          <button onClick={handleBackt}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className="productInfo__images-container">
            <div className="productInfo__images-footer">
              <ul>
                {product?.productImgs.map((url, index) => (
                  <li
                    key={url}
                    className={`${nextImg === index * 100 && "borderSelect"}`}
                  >
                    <img
                      onClick={() => {
                        handleBtnIng(index);
                      }}
                      src={url}
                      alt=""
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="productInfo__images-header">
              <div>
                {product?.productImgs.map((url) => (
                  <img style={styleImg} key={url} src={url} alt="" />
                ))}
              </div>
            </div>
          </div>
          <button onClick={handleNext}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        <div className="productInfo__description">
          <h1>{product?.title}</h1>
          <p>{product?.description}</p>
          <div className="productInfo__cart">
            <div className="productInfo__price">
              <label htmlFor="">Price</label>
              <div>$ {(product?.price * counter).toFixed(2)}</div>
            </div>
            <div className="productInfo__quantity">
              <label htmlFor="">Quantity</label>
              <div className="productInfo__counter">
                <button onClick={handleMinustCounter}>-</button>
                <p>{counter}</p>
                <button onClick={handleNextCounter}>+</button>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              addToCart(product?.id);
            }}
          >
            Add to cart <AiOutlineShoppingCart />
          </button>
        </div>
      </div>
      <div className="productInfo__footer">
        <h1>Discover similar items</h1>
        <div className="similarItems">
          {simillarProduct?.map((product) => (
            <CardProduct key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
