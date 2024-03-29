import { getAllOrders } from '../utils/ApiFuncs'
import React, { useEffect, useState } from 'react'
import { Col, Row } from "react-bootstrap"
import { MdManageSearch } from "react-icons/md";
import Paginator from '../common/Paginator';
import '../../styles/ExistingOrder.css'
import { CiEdit } from "react-icons/ci";
import { updateOrderStatus } from '../utils/ApiFuncs'
import { Link, useLocation, useNavigate } from "react-router-dom"


const ExistingOrder = () => {

	const [orders, setOrders] = useState([])
	const [ordersPerPage] = useState(5)
	const [currentPage, setCurrentPage] = useState(1)
	const [isLoading, setIsLoading] = useState(false)
	const [successMsg, setSuccessMsg] = useState("")
	const [errorMsg, setErrorMsg] = useState("")
	

	useEffect(() => {
		fetchOrders()
	}, [])

	const fetchOrders = async () => {
		setIsLoading(true)
		try {
			const result = await getAllOrders();
			setOrders(result)
			setIsLoading(false)
		} catch (error) {
			setErrorMsg(error.message)
			setIsLoading(false)
		}
	}

	const calculateTotalPages = (ordersPerPage, orders) => {
		const totalOrders = orders.length;
		return Math.ceil(totalOrders / ordersPerPage)
	}

	const handlePaginationClick = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	
	const indexOfLast = currentPage * ordersPerPage
	const indexOfFirst = indexOfLast - ordersPerPage
	const currentOrders = orders.slice(indexOfFirst, indexOfLast)


	return (
		<>
			{isLoading ? (
				<p>Loading existing orders...</p>
			) : (

				<section className="container mt-3 mb-5 ">
					<Row className="justify-content-center">
						<Col md={6} className="pt-5">
							<h4 className='mb-5'><MdManageSearch />&nbsp;&nbsp;Manage Orders</h4>
						</Col>
					</Row>
					<Row className="justify-content-center">
						<Col md={6} >
							<table className="table table-bordered table-hover">
								<thead>
									<tr className="text-center">
										<th scope="col">Order No.</th>
										<th scope="col">Order Date</th>
										<th scope="col">Total Price</th>
										<th scope="col">Status</th>
										<th scope="col">Action</th>
									</tr>
								</thead>
								<tbody>
									{currentOrders.map((order) => (
										<tr key={order.orderId} className="text-center">
											<th scope="row">#{order.orderId}</th>
											<td>{order.orderDate}</td>
											<td>${order.totalPrice}</td>
											<td>
												{order.status}
											</td>
											<td>
												<Link to="/order-details" state={{ theOrder: order}} className="gap-2">
												   <CiEdit />
												</Link>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</Col>
					</Row>
					<Paginator
						currentPage={currentPage}
						totalPages={calculateTotalPages(ordersPerPage, orders)}
						onPageChange={handlePaginationClick}
					/>
				</section>)}
		</>
	)
}

export default ExistingOrder
