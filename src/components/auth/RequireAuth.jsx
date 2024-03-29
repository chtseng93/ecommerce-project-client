import React from "react"
import { Navigate, useLocation } from "react-router-dom"

const RequireAuth = ({ children }) => {
	const user = localStorage.getItem("botland-userId")
	const location = useLocation()
	if (!user) {
		return <Navigate to="/login-page" state={{ path: location.pathname, require:"Shopping cart requires user authentication!"}} />
	}
	return children
}
export default RequireAuth
