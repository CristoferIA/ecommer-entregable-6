import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "../../public/css/singup.css";

const Singup = () => {
  const {register, handleSubmit, reset} = useForm()
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const submit =(data)=>{
    data.role = 'admin'
    const URL = 'https://e-commerce-api.academlo.tech/api/v1/users'

    axios.post(URL, data)
    .then(res=>{
      navigate('/login')
    })
    .catch(res=>{
      //console.log(res.response.data.message);
      setMessage(res.response.data.message)
    })
  }
  return (
    <form onSubmit={handleSubmit(submit)}>
    <div className="singup">      
      <div className="singup__container">
        <h1>Sing Up</h1>
        <div>
        <label className="message" htmlFor="">{message}</label>
      </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" required {...register('email')}/>
        </div>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input id="firstName" type="text" required {...register('firstName')}/>
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input id="lastName" type="text" required {...register('lastName')}/>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" required {...register('password')}/>
        </div>
        <div>
          <label htmlFor="phone">Phone (10 characters):</label>
          <input id="phone" type="number" required {...register('phone')}/>
        </div>
        <div>
          <button>Sing Up</button>
        </div>
        <div>
          <label className="login-text" htmlFor="">
            Already have an account? <Link to="/login">Log in</Link>
          </label>
        </div>
      </div>
    </div>
    </form>
  );
};

export default Singup;
