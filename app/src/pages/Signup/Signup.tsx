import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../../Context/AuthContext";

import './Signup.scss'
import { BlobThree } from '../../components/Blob/Blob';

export const Signup = () => {

    const navigate = useNavigate();

    const { signup, signupError } = useContext(AuthContext);

    const [hover, setHover] = useState(false as boolean);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        signup(e.target.pseudo.value, e.target.email.value, e.target.password.value);
    }

    useEffect(() => {
        if (signupError === "Utilisateur créé") {
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }
    }, [signupError, navigate])

    return (
        <div className="signup">
            <div className='left__container'>
                <BlobThree hoverBtn={hover} />
            </div>
            <div className='right__container'>
                <form action="" onSubmit={handleSubmit}>
                    <div className="form__header">
                        <h1>Welcome to ..!</h1>
                        <p>Sign up to your account</p>
                    </div>
                    <div className="group-input">
                        <input type="text" placeholder="Pseudo" id='pseudo' />
                    </div>
                    <div className="group-input">
                        <input type="email" placeholder="Email" id='email' />
                    </div>
                    <div className="group-input">
                        <input type="password" placeholder="Password" id='password' />
                    </div>
                    <div className="group-input">
                        <input type="submit" value="Sign in" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} />
                    </div>
                    {
                        signupError && <p className="error">{signupError}</p>
                    }
                    <div className="form__bottom">
                        <div className="or-separator">
                            <div className="separator-line"></div>
                            <p>or</p>
                            <div className="separator-line"></div>
                        </div>
                        <p>
                            Don't have an account? <Link to="/">Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}