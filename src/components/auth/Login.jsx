import React, { useEffect, useState } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm';
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Col, Row } from "react-bootstrap"
import { GrLogin } from "react-icons/gr";
import { BsRobot } from "react-icons/bs";
import "../../styles/Login.css"

const Login = () => {
    const [loginFormvisibilty,setLoginFormvisibilty] = useState(true);
    const [signupFormvisibilty,setSignupFormvisibilty] = useState(false);
    const location = useLocation() ;
    const state = location.state || { require: "", path: '/' };
  
    
    const handleToggle=(event)=>{
        const value = event.target.value;
        if(value==="signup"){
            setLoginFormvisibilty(false);
            setSignupFormvisibilty(true);
        }else{
            setLoginFormvisibilty(true);
            setSignupFormvisibilty(false);
        }

    }
    return (

        <section className="container my-5 border py-5 bg-light">
            {state.require&&
            (<Row className="justify-content-center mb-5"><Col md={6}><div className="alert alert-danger fade show">{state.require}</div></Col></Row>)
            }
            <Row className="justify-content-center mb-5">
                <Col md={6} className="d-flex justify-content-start border-bottom">
                    <button className={loginFormvisibilty?'h5 border-0 title-focus me-3':'h5 border-0 title me-3'} value="login" onClick={handleToggle} path={state.path}><GrLogin />&nbsp;&nbsp;Log-in</button>
                    <button className={signupFormvisibilty?'h5 border-0 title-focus':'h5 border-0 title'} onClick={handleToggle} value="signup"><BsRobot />&nbsp;&nbsp;Sign-Up</button>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={6}>
                    <LoginForm visibilty={loginFormvisibilty}/>
                    <SignupForm visibilty={signupFormvisibilty}/>
                </Col>
            </Row>
        </section>
    )
}

export default Login
