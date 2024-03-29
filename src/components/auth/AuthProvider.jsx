import React, { createContext, useState, useContext } from "react"

export const AuthContext = createContext({
	loginUser: null,
	handleLogin: (data) => {},
	handleLogout: () => {}
})

export const AuthProvider = ({ children }) => {
	const [loginUser, setLoginUser] = useState(null)

	const handleLogin = (data) => {
		console.log("data",data)
		localStorage.setItem("botland-userId", data.userId)
		localStorage.setItem(
			"botland-userRole",
			JSON.stringify(data.roles)
		  );
		localStorage.setItem("botland-token", data.token)
		setLoginUser(data)
	}

	const handleLogout = () => {
		localStorage.removeItem("botland-userId")
		localStorage.removeItem("botland-userRole")
		localStorage.removeItem("botland-token")
		setLoginUser(null)
	}

	return (
		<AuthContext.Provider value={{ loginUser, handleLogin, handleLogout }}>
			{children}
		</AuthContext.Provider>
	)
}


export const useAuth = () =>{
	const context = useContext(AuthContext);
	if (!context) {
	  throw new Error('useAuth must be used within a AuthContext');
	}
	return context;
  }
