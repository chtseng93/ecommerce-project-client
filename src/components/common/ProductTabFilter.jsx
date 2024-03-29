import React, { useEffect, useState } from "react"
import '../../styles/ProductTabFilter.css'
import { IoFilterCircle } from "react-icons/io5";
import { LiaRobotSolid } from "react-icons/lia";
import { MdFilterListOff } from "react-icons/md";
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';

const ProductTabFilter = ({ data, setFilteredData }) => {
	const [filter, setFilter] = useState("")

	const handleSelectChange = (event) => {
		const selectedType = event.target.value

		if (selectedType === 'All') {
			setFilter("")
			setFilteredData(data)
		} else {
			setFilter(selectedType)
			const filteredProducts = data.filter((product) =>
				product.productType.toLowerCase().includes(selectedType.toLowerCase())
			)
			setFilteredData(filteredProducts)

		}
	}

	const productTypes = ["", ...new Set(data.map((product) => product.productType))]

	return (
		<div className="input-group mb-3 mt-3 ps-4">
			<h5 className="me-3"><IoFilterCircle  />&nbsp;&nbsp;Filter:</h5>
			<span><button className="filterButton fw-bolder" type="button" onClick={handleSelectChange} value="All">
			<MdFilterListOff />&nbsp;&nbsp;All
			</button></span>
			{productTypes.map((type, index) => (
				String(type) && (<span key={index}><button className="filterButton fw-bolder" type="button" onClick={handleSelectChange} value={String(type)}>
					<LiaRobotSolid />&nbsp;{String(type)}
				</button></span>)
			))}

		</div>
	)
}

export default ProductTabFilter
