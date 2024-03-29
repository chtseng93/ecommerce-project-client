import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import { LuFacebook } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa";
import { LuTwitter } from "react-icons/lu";
import { LiaHatWizardSolid } from "react-icons/lia";
import { LuPiggyBank } from "react-icons/lu";


const Footer = () => {
	let today = new Date()
	return (
		<footer className="bg-dark text-light py-3 footer mt-lg-5">
			<Container>
				<Row className="mt-3 mb-3">
				    <Col xs={12} md={12} className="text-center">
					<h2 className="mb-3">Contact Us</h2>
					{/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, tempor incididunt ut labore et dolore magna aliqua. <br/> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua. <br/> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p> */}
					<h3><LuFacebook />&nbsp;&nbsp;<FaInstagram />&nbsp;&nbsp;<LuTwitter />&nbsp;&nbsp;<LiaHatWizardSolid />&nbsp;&nbsp;<LuPiggyBank /></h3>
					</Col>
					<Col xs={12} md={12} className="text-center">
						<p className=""> &copy; {today.getFullYear()} BotLand. Practice Purpose Only</p>
					</Col>
				</Row>
			</Container>
		</footer>
	)
}

export default Footer