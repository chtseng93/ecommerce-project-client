
import React, { Children, useState } from "react"
import '../../styles/CommonModal.css'
import { IoCloseOutline } from "react-icons/io5";
import PropTypes from "prop-types";
const CommonModal = ({visibilty,children,onClose}) => {
	
	CommonModal.propType ={
		onClose: PropTypes.func
	}
	
	CommonModal.defaultProps = {
		onClose:()=>{console.log('Hey!!')}
	
	}

	return (
		<div
				className="modal"
				style={{
					display: visibilty
						? "flex"
						: "none",
				}}>
			<div className="modalContent">
			{children}
			</div>

		</div>

	)
}

export default CommonModal
