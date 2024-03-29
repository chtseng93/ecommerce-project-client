import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from "react-bootstrap"
import { getAllProducts } from '../utils/ApiFuncs'
import Paginator from '../common/Paginator'
import ProductCard from './ProductCard'
import ProductTabFilter from '../common/ProductTabFilter'



const Product = () => {
    const [productData, setProductData] = useState([])
    const [errorMsg, setErrorMsg] = useState(null)
    const [isLoading, setIsLoading] =useState(false)
    const [currentPage, setCurrentPage] =useState(1)
    const [productsPerPage] = useState(6) 
    const [filteredProductData, setFilteredProductData] =useState([])
    
    useEffect(()=>{
        setIsLoading(true);
        getAllProducts().then((data)=>{
			const newData= data.filter((p)=>p.status==='valid')
            setProductData(newData)
            setFilteredProductData(newData)
            setIsLoading(false)

        }).catch((error)=>{
            setErrorMsg(error.message)
            setIsLoading(false)
        })

    },[])
    if (isLoading) {
		return <div>Loading Products.....</div>
	
	}
	if (errorMsg) {
		return <div className=" text-danger">Error : {errorMsg}</div>
	}

    const handlePageChange =(pageNumer)=>{
        setCurrentPage(pageNumer)
    }

    const totalPages = Math.ceil(filteredProductData.length/productsPerPage);

    const renderProducts = () => {
		const startProductIndex = (currentPage - 1) * productsPerPage
		const endProductIndex = startProductIndex + productsPerPage
		return filteredProductData
			.slice(startProductIndex, endProductIndex)
			.map((product) => <ProductCard key={product.productId} product={product} />)
	}

  return (
    <Container>
			<Row className="mb-5">
				<Col md={12} className="d-flex align-items-center justify-content-start border-bottom border-top py-2">
				<ProductTabFilter data={productData} setFilteredData={setFilteredProductData}/>
				</Col>
			</Row>

			<Row className="d-flex align-items-center justify-content-center">{renderProducts()}</Row>

			<Row>
				<Col md={12} className="d-flex align-items-center justify-content-center">
					<Paginator
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</Col>
			</Row>
	</Container>
  )
}

export default Product
