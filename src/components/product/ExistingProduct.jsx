import React, { useEffect, useState } from "react"
import { getAllProducts } from "../utils/ApiFuncs"
import { Col, Row } from "react-bootstrap"
import ProductFilter from "../common/ProductFilter"
import Paginator from "../common/Paginator"
import { FaPlus } from "react-icons/fa"
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa6";



const ExistingProduct = () => {
	const [products, setProducts] = useState([{ productId: "", productType: "", productPrice: "" ,status:""}])
	const [currentPage, setCurrentPage] = useState(1)
	const [productsPerPage] = useState(5)
	const [isLoading, setIsLoading] = useState(false)
	const [filteredProducts, setFilteredProducts] = useState([{ productId: "", productType: "", productPrice: "" ,status:""}])
	const [selectedProductType, setSelectedProductType] = useState("")
	const [errorMsg, setErrorMsg] = useState("")
	const [successMsg, setSuccessMsg] = useState("")

	useEffect(() => {
		fetchProducts()
	}, [])

	const fetchProducts = async () => {
		setIsLoading(true)
		try {
			const result = await getAllProducts()
			setProducts(result)
			setIsLoading(false)
		} catch (error) {
			setErrorMsg(error.message)
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (selectedProductType === "") {
			setFilteredProducts(products)
		} else {
			const filteredProducts = products.filter((product) => product.productType === selectedProductType)
			setFilteredProducts(filteredProducts)
		}
		setCurrentPage(1)
	}, [products, selectedProductType])

	const handlePaginationClick = (pageNumber) => {
		setCurrentPage(pageNumber)
	}


	const calculateTotalPages = (filteredProducts, productsPerPage, products) => {
		const totalProducts = filteredProducts.length > 0 ? filteredProducts.length : products.length
		return Math.ceil(totalProducts / productsPerPage)
	}

	const indexOfLastProduct = currentPage * productsPerPage
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage
	const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

	return (
		<>
			<div className="container col-md-8 col-6">
				{successMsg && <p className="alert alert-success mt-5">{successMsg}</p>}

				{errorMsg && <p className="alert alert-danger mt-5">{errorMsg}</p>}
			</div>
			
			{isLoading ? (			
			<p>Loading existing products...</p>
			) : (
				<>
					<section className="mt-5 mb-5 container col-6">
						<div className="d-flex justify-content-between mb-3 mt-5">
							<h4><FaClipboardList />&nbsp;&nbsp;Existing Products</h4>
						</div>

						<Row>
							<Col md={6} className="mb-2 md-mb-0">
							<ProductFilter data={products} setFilteredData={setFilteredProducts} />
							</Col>

							<Col md={6} className="d-flex justify-content-end">
								<Link to={"/add-Product"}>
									<FaPlus /> Add Product
								</Link>
							</Col>
						</Row>
						
						<table className="table table-bordered table-hover">
							<thead>
								<tr className="text-center">
									<th>ID</th>
									<th>Product Name</th>
									<th>Product Type</th>
									<th>Product Price</th>
									<th>status</th>
									<th>Actions</th>
								</tr>
							</thead>

							<tbody>
								{currentProducts.map((product) => (
									<tr key={product.productId} className="text-center">
										<td>{product.productId}</td>
										<td>{product.productType}</td>
										<td>{product.productName}</td>
										<td>{product.productPrice}</td>
										<td>{product.status}</td>
										<td className="gap-2">
											<Link to={`/edit-product/${product.productId}`} className="gap-2">
												<span className="btn btn-sm">
													<CiEdit />
												</span>
											</Link>
										
											{/* <button
												className="btn btn-sm ml-5"
												onClick={() => handleDelete(product.productId)}>
												<CiTrash />
											</button> */}
										</td>
									</tr>
								))}
							</tbody>
						</table>
						
						<Paginator
							currentPage={currentPage}
							totalPages={calculateTotalPages(filteredProducts, productsPerPage, products)}
							onPageChange={handlePaginationClick}
						/>
					</section>
				</>
			)}
		</>
	)
}

export default ExistingProduct
