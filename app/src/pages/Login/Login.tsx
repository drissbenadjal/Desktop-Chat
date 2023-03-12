import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from "../../Context/AuthContext";

import './Login.scss'

export const Login = () => {

  const { login } = useContext(AuthContext);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    login(e.target.username.value, e.target.password.value);
  }

  return (
    <div className="login">
      <form action="" onSubmit={handleSubmit}>
        <div className="group-input">
          <input type="text" placeholder="Username" id='username' />
        </div>
        <div className="group-input">
          <input type="password" placeholder="Password" id='password' />
        </div>
        <div className="group-input">
          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
  )
}