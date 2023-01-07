import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../public/css/login.css";
import "../../public/css/logged.css";
import { useDispatch } from "react-redux";
import { getUserCart } from "../store/slices/cart.slice";

const Login = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const [isLogged, setIsLogged] = useState(false)

    const handleSubmit = (e)=>{
        e.preventDefault()
        const data = {
            email: e.target.email.value.trim(),
            password: e.target.pass.value.trim()
        }
        const URL = 'https://e-commerce-api.academlo.tech/api/v1/users/login'
        axios.post(URL, data)
        .then(res=>{
            localStorage.setItem('token', res.data.data.token)
            setIsLogged(true)
            navigate('/')
            dispatch(getUserCart())
        })
        .catch(err=>console.log(err))
    }

    useEffect(() => {
      const condition = localStorage.getItem('token') ? true : false
      setIsLogged(condition)
    }, [])

    const handleLogut = ()=>{
      localStorage.removeItem('token')
      setIsLogged(false)
      dispatch(getUserCart())
    }

    if (isLogged) {
      return (
        <div className="logged">
          <div>
          <h1>User Logged</h1>
          <button onClick={handleLogut}>logout <i className="fas fa-sign-out-alt"></i></button>
          </div>
        </div>
      )
    }

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__header">
          <h1>¡WELCOME!</h1>
          <p>Enter your email and password</p>
        </div>
        <div className="login__test">
          <h4>Test data</h4>
          <p><span><i className="far fa-envelope"></i></span> max@gmail.com</p>
          <p> <span><i className="fas fa-unlock-alt"></i></span> pass1234</p>
        </div>
        <form onSubmit={handleSubmit} className="login__autentications">
          <div className="login__data">
            <div className="login__user">
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" placeholder="example@gmail.com" required/>
            </div>
            <div className="login__password">
              <label htmlFor="pass">Password</label>
              <input id="pass" type="password" required />
            </div>
          </div>
          <div className="login__submit">
            <button>LOG IN</button>
          </div>
        </form>
        <div className="login__register">
          <p>
            Don't have an account? <Link to={"/singup"}>join up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
