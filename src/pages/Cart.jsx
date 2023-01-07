import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '../../public/css/cart.css'
import CartItem from '../components/cart/CartItem';
import { getUserCart } from '../store/slices/cart.slice';
import getConfig from '../utils/getConfig';

const Cart = () => {
    const dispatch = useDispatch()
    const cart = () => {
        const cart = document.querySelector('.cart')
        cart.classList.toggle('cart-none')
      };

    const cartItems = useSelector((state)=>state.cart)
    const handleCheckout =()=>{
        const URL = 'https://e-commerce-api.academlo.tech/api/v1/purchases'
        const data = {
            "street": "Green St. 1456",
            "colony": "Southwest",
            "zipCode": 12345,
            "city": "USA",
            "references": "Some references"
        }
        axios.post(URL, data, getConfig())
        .then(res=>{
            dispatch(getUserCart())
        })
        .catch(err=>console.log(err))
    }
    let totalPrice = 0
    cartItems?.forEach((product)=>{
        totalPrice += (product.productsInCart.quantity * product.price)
    })

  return (
    <div className='cart'>
        <div className='card__header'>
            <h3>Shopping cart</h3>
            <button onClick={cart}><i className="fas fa-times"></i></button>
        </div>
        <div className='cart__container'>
            {
                cartItems?.map(product=>(
                    <CartItem key={product.id} product={product}/>
                ))
            }
        </div>
        <footer>
            <div>
                <p>Total cart:</p>
                <p>$ {totalPrice.toFixed(2)}</p>
            </div>
            <div>
                <button onClick={handleCheckout}>Checkout</button>
            </div>
        </footer>
    </div>
  )
}

export default Cart