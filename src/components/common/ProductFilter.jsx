import React, { useState } from "react"
import '../../styles/AddEditProduct.css'
import { FaFilter } from "react-icons/fa"

const ProductFilter = ({ data, setFilteredData }) => {
	const [filter, setFilter] = useState("")

	const handleSelectChange = (event) => {
		const selectedType = event.target.value
		
		if(selectedType==='All'){
			setFilter("")
		    setFilteredData(data)
		}else{
			setFilter(selectedType)
			const filteredProducts = data.filter((product) =>
				product.productType.toLowerCase().includes(selectedType.toLowerCase())
			)
			setFilteredData(filteredProducts)

		}
	}

	const productTypes = ["", ...new Set(data.map((product) => product.productType))]

	return (
		<div className="input-group mb-3">
			<select
				className="form-control form-select"
				aria-label="product type filter"
				value={filter}
				onChange={handleSelectChange}>
				<option value="" >select a product type to filter....</option>
				{productTypes.map((type, index) => (
					<option key={index} value={String(type)}>
						{String(type)}
					</option>
				))}
				<option value="All">All</option>
			</select>
		</div>
	)
}
export default ProductFilter
