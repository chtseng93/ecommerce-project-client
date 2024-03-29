import React, { useContext, useEffect, useState } from "react"
import { NavLink, Link } from "react-router-dom"
import { TiShoppingCart } from "react-icons/ti";
import logo from '../../images/botland.png';
import { useCart } from "../cart/CartContext";
import { useAuth } from "../auth/AuthProvider";

import Logout from "../auth/Logout";
import { RiFileUserFill } from "react-icons/ri";


const NavBar = () => {
	const [showAccount, setShowAccount] = useState(false)

	const handleAccountClick = () => {
		setShowAccount(!showAccount)
	}
	const { loginUser } = useAuth();
	const [isLoggedIn, setIsLoggedIn] = useState("")
	const [userRoles, setUserRoles] = useState([])

	const [productsInCart, setProductsInCart] =
		useState(
			JSON.parse(
				localStorage.getItem(
					"botland-shopping-cart"
				)
			) || []
		);



	const { cartItems } = useCart();
	const [cartItemCount, setCartItemCount] = useState(productsInCart.length);

	useEffect(() => {
		setCartItemCount(cartItems.length);
		console.log("nav-cartItems", cartItems);
	}, [cartItems]);

	useEffect(() => {
		setIsLoggedIn(localStorage.getItem("botland-token"));
		setUserRoles(JSON.parse(
			localStorage.getItem(
				"botland-userRole"
			)
		) || [])
		setShowAccount(false)

	}, [loginUser])
	

	return (
		<nav className="navbar navbar-expand-lg p-3 border-top border-bottom sticky-top bg-white ">
			<div className="container-fluid">
				<div className="border-end me-2">
					<Link to={"/"} className="navbar-brand">
						<img src={logo} alt="logo" className="botland" />
					</Link>
				</div>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarScroll"
					aria-controls="navbarScroll"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarScroll">
					<ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll ms-1">
						<li className="nav-item">
							<NavLink className="nav-link" aria-current="page" to={"/browse-all-products"}>
								Browse all bots
							</NavLink>
						</li>

						{isLoggedIn && userRoles.includes("ADMIN") && (
							<li className="nav-item">
								<NavLink className="nav-link" aria-current="page" to={"/admin"}>
									Admin
								</NavLink>
							</li>
						)}
					</ul>

					<ul className="d-flex navbar-nav fs-5">


						{isLoggedIn ?
							(<li className="nav-item dropdown"><a
								className={`nav-link ${showAccount ? "show" : ""}`}
								href="#"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								onClick={handleAccountClick}>

								MyAccount
							</a>
								<ul
									className={`dropdown-menu ${showAccount ? "show" : ""}`}
									aria-labelledby="navbarDropdown"
								><Logout />
								</ul>
							</li>) :
							(
							<li className="nav-item">
								<NavLink className="nav-link" to={"/login-page"}>
									Login
								</NavLink>
							</li>
							)
						}
						<li className="nav-item">
							<NavLink className="nav-link" to={"/shopping-cart"}>
								<TiShoppingCart />{cartItems.length > 0 && (<span className="customBadge">{cartItemCount}</span>)}
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default NavBar
