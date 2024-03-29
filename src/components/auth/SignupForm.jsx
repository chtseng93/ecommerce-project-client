import React, { useState } from 'react'
import { registerUser } from '../utils/ApiFuncs'
import CommonModal from '../common/CommonModal'
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { Link,useNavigate } from "react-router-dom"

const SignupForm = ({ visibilty }) => {
  const [newUser, setNewUser] = useState({
    firstName: "", lastName: "", email: "", password: ""
  })
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [signupModalVisibilty, setSignupModalVisibilty] = useState(false)

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value })
  }

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {

      const result = await registerUser(newUser)
      setSuccessMsg(result)
      setErrorMsg("")
      setNewUser({ firstName: "", lastName: "", email: "", password: "" })
      setSignupModalVisibilty(true)
    } catch (error) {
      setSuccessMsg("")
      setErrorMsg(`Registration error : ${error.message}`)
    }
    setTimeout(() => {
      setErrorMsg("")
      setSuccessMsg("")
    }, 70000)
  }

  return (

    <div style={{ display: visibilty ? "block" : "none" }}>
      <CommonModal visibilty={signupModalVisibilty}>
        <div className='d-flex justify-content-center order-confirm'><h1><FaRegCircleCheck /></h1></div>
        <div className='d-flex justify-content-center mt-2'>
          <h3 className='order-confirm'>Thanks for signing up!</h3>
        </div>
        <div className='d-flex justify-content-center'>
          <p>{successMsg}</p>
        </div>
        <div className="d-flex justify-content-center" >
          <Link to={"/login-page"} onClick={() => window.location.reload()} className="">
            <p><IoIosArrowBack />Login My Account</p>
          </Link>
        </div>
      </CommonModal >

      {errorMsg && <div className="alert alert-danger fade show"> {errorMsg}</div>}
      <form>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">FirstName</label>
          <input type="firstName" className="form-control" name="firstName" onChange={handleInputChange} value={newUser.firstName} />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">LastName</label>
          <input type="lastName" className="form-control" name="lastName" onChange={handleInputChange} value={newUser.lastName} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={handleInputChange} value={newUser.email} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={handleInputChange} value={newUser.password} />
        </div>
        <div className="d-grid gap-2 d-md-flex mt-2">
          <button className="login-page-Button mt-4" type="submit" onClick={handleSignUp} >
            Sign-Up
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignupForm
