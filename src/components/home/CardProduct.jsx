import React from 'react'
import './cardProduct.css'
import { BsCartPlus } from "react-icons/bs";
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { useDispatch } from 'react-redux';
import { getUserCart } from '../../store/slices/cart.slice';
import { useNavigate } from 'react-router-dom';

const CardProduct = ({product}) => {  
     const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleClick = ()=>{
        const data ={
            id: product.id,
            quantity: 1,
        }
        const URL = "https://e-commerce-api.academlo.tech/api/v1/cart";
        axios.post(URL, data, getConfig())
        .then(res=>{
            console.log(res.data);
            dispatch(getUserCart())
        })
        .catch(err=>{
            console.log(err)
            navigate('login')
        })
    }

    const handleProductInfo = (id)=>{
        navigate(`/product/${id}`)
    }
  return (
    <div className='product'>
        <div className='product__images'>
            <img className='product__img' src={product.productImgs[0]} alt="" />
            <img className='product__img' src={product.productImgs[1]} alt="" />
        </div>
        <div className='product__description'>
            <h2 onClick={()=>{handleProductInfo(product.id)}}>{product.title}</h2>
        </div>
        <div className='product__options'>
            <div className='product__price'>
                <div>Price</div>
                <div>$ {product.price}</div>
            </div>
            <div className='product__btn-card'>
                <button onClick={handleClick}><BsCartPlus/></button>
            </div>
        </div>
    </div>
  )
}

export default CardProduct