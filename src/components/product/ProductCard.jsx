import React from 'react'
import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import '../../styles/ProductCard.css'
import { AiFillRobot } from "react-icons/ai";
import { IoPricetagsOutline } from "react-icons/io5";

const ProductCard = ({product}) => {
  return (
    <Col key={product.productId} className="mb-4 d-flex justify-content-center" md={4}>
    
			<Card key={product.productId} className="rounded-0" style={{ width:"300px", height:"300px" }}>
                <div className="card-img-top">
						<Link to={`/view-product/${product.productId}`}>
							<Card.Img
                                className='rounded-0'
								variant="top"
								src={`data:image/png;base64, ${product.picture}`}
								alt="Product picture"
								style={{ maxWidth: "100%", display:"block", height: "16em"}}
							/>
						</Link>
				</div>
				<Card.Body className="card-body" >
					<div className="flex-grow-1 ml-3  justify-content-center">
						<button type="button" className="btn btn-sm btn-secondary cardLabelButton mb-2 border-0"><IoPricetagsOutline />&nbsp;{product.productType}</button>
						<Card.Title className="title-custom fs-6 fw-normal"><AiFillRobot />&nbsp;&nbsp;{product.productName}</Card.Title>
						<Card.Text className='fw-bold'>USD {product.productPrice}</Card.Text>
					</div>
				</Card.Body>
			</Card>
	
    </Col>
  )
}

export default ProductCard
