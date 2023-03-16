import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from "../../Context/AuthContext";

import './Login.scss'

export const Login = () => {

  const { login, loginError } = useContext(AuthContext);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    login(e.target.email.value, e.target.password.value);
  }

  return (
    <div className="login">
      <form action="" onSubmit={handleSubmit}>
        <div className="group-input">
          <input type="text" placeholder="Email" id='email' />
        </div>
        <div className="group-input">
          <input type="password" placeholder="Password" id='password' />
        </div>
        {
          loginError && <p className="error">{loginError}</p>
        }
        <div className="group-input">
          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
  )
}