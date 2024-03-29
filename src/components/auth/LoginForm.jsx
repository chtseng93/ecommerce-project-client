import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "./AuthProvider"
import { loginUser } from '../utils/ApiFuncs'


const LoginForm = ({visibilty,path}) => {
    const [errorMsg, setErrorMsg] = useState("")
	const [login, setLogin] = useState({
		email: "",
		password: ""
	})

	const navigate = useNavigate()
	const auth = useAuth()
	const location = useLocation()
  
	const redirectUrl = path?.path || "/"

	const handleInputChange = (e) => {
		setLogin({ ...login, [e.target.name]: e.target.value })
	}



    const handleSubmit = async(event) =>{
        event.preventDefault()
		const success = await loginUser(login)
		if (success) {
			// const token = success.token
			auth.handleLogin(success)
			navigate(redirectUrl, { replace: true })
		} else {
			setErrorMsg("Invalid username or password. Please try again.")
		}
		setTimeout(() => {
			setErrorMsg("")
		}, 10000)

    }
    return (
        <div style={{display: visibilty? "block": "none",}}>
           {errorMsg &&
            (<div className="alert alert-danger fade show">{errorMsg}</div>)
           }
            <div className='mb-5'>
                <p className='h6'>Welcome Back !!</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" onChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" onChange={handleInputChange} />
                </div>
                <div className="d-grid gap-2 d-md-flex mt-2">
                    <button className="login-page-Button mt-4" type="submit" >
                        Log-In
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm