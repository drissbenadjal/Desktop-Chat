import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from "../../Context/AuthContext";

import './Login.scss'

export const Login = () => {

  const { login, loginError } = useContext(AuthContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    login(e.target.email.value, e.target.password.value);
  }

  return (
    <div className="login">
      <div className='left__container'>
      </div>
      <div className='right__container'>
        <form action="" onSubmit={handleSubmit}>
          <div className="form__header">
            <h1>Welcome back!</h1>
            <p>Sign in to your account</p>
          </div>
          <div className="group-input">
            <input type="email" placeholder="Email" id='email' />
          </div>
          <div className="group-input">
            <input type="password" placeholder="Password" id='password' />
          </div>
          <div className="group-input">
            <Link to="/">Forgot password ?</Link>
          </div>
          <div className="group-input">
            <input type="submit" value="Login" />
          </div>
          {
            loginError && <p className="error">{loginError}</p>
          }
          <div className="form__bottom">
            <div className="or-separator">
              <div className="separator-line"></div>
              <p>or</p>
              <div className="separator-line"></div>
            </div>
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}