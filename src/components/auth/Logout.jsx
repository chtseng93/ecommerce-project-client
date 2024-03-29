import React, { useContext } from "react"
import { AuthContext } from "./AuthProvider"
import { Link, useNavigate } from "react-router-dom"
import { RiLogoutBoxRFill } from "react-icons/ri";
import { GiVintageRobot } from "react-icons/gi";

const Logout = () => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        auth.handleLogout()
        navigate("/", { state: { message: " You have been logged out!" } })
    }

    return (
        <>
            <li>
                <Link className="dropdown-item" to={"/my-purchase"}>
                    <GiVintageRobot />&nbsp;&nbsp;My Purchase
                </Link>
            </li>
            <li>
                <hr className="dropdown-divider" />
            </li>
            <button className="dropdown-item" onClick={handleLogout}>
            <RiLogoutBoxRFill />&nbsp;&nbsp;Logout
            </button>
        </>
    )
}

export default Logout
