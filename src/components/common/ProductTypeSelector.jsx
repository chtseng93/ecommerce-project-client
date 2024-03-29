import React from 'react'
import { getProductTypes } from '../utils/ApiFuncs'
import { useState,useEffect } from 'react'

const ProductTypeSelector = ({ handleProductInputChange, newProduct }) => {
	const [productTypes, setProductTypes] = useState([""])
	const [showNewProductTypeInput, setShowNewProductTypeInput] = useState(false)
	const [newProductType, setNewProductType] = useState("")

	useEffect(() => {
		getProductTypes().then((data) => {
			console.log("data",data)
			setProductTypes(data)
		})
	}, [])
	
	const handleNewProductTypeInputChange = (e) => {
		setNewProductType(e.target.value)
	}

	const handleAddNewProductType = () => {
		if (newProductType !== "") {
			setProductTypes([...productTypes, newProductType])
			setNewProductType("")
			setShowNewProductTypeInput(false)
		}
	}

    
  return (
	<>
		{productTypes.length > 0 && (
			<div>
				<select
					required
					className="form-control form-select"
					name="productType"
					onChange={(e) => {
						if (e.target.value === "Add New") {
							setShowNewProductTypeInput(true)
						} else {
							handleProductInputChange(e)
						}
					}}
					value={newProduct.productType}>
					<option value=""></option>
					<option value={"Add New"}>Add New</option>
					{productTypes.map((type, index) => (
						<option key={index} value={type}>
							{type}
						</option>
					))}
				</select>
				{showNewProductTypeInput && (
					<div className="mt-2 ">
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								placeholder="Enter New Product Type ..."
								value={newProductType}
								onChange={handleNewProductTypeInputChange}
							/>
							<button id="addTypeButton" className="addButton" type="button" onClick={handleAddNewProductType}>
								Add
							</button>
						</div>
					</div>
				)}
			</div>
		)}
	</>
)
}

export default ProductTypeSelector
