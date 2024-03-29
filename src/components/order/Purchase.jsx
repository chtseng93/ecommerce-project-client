import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from "react-bootstrap"
import { getOrderByUserId } from '../utils/ApiFuncs'
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { GiRobotAntennas } from "react-icons/gi";
import CommonModal from '../common/CommonModal'


const Purchase = () => {
  // const userId = useParams(); 
  const userId = localStorage.getItem("botland-userId")
  // const userId = 1;
  const [orders, setOrders] = useState([])
  // const [productsPerPage] = useState(5)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    setIsLoading(true)
    try {
      const result = await getOrderByUserId(userId);
      setOrders(result)
      setIsLoading(false)
    } catch (error) {
      setErrorMsg(error.message)
      setIsLoading(false)
    }
  }


  return (
    <section className="container mt-3 mb-5 ">
      <Row className="justify-content-center">
        <Col md={8} className="pt-5">
          <h4 className='mb-5'><GiRobotAntennas />&nbsp;&nbsp;My Purchase</h4>
        </Col>
        {orders.length === 0 ?
            (<Col md={8} ><div>
              <p className="fs-6">You haven't purchase any product yet...</p>
            </div></Col>)
            :
        (<Col md={8} >
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Order No.</th>
                <th scope="col">Order Date</th>
                <th scope="col">Total Price</th>
                <th scope="col">Status</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <th scope="row">#{order.orderId}</th>
                  <td>{order.orderDate}</td>
                  <td>${order.totalPrice}</td>
                  <td>{order.status}</td>
                  <td>
                    <Link to="/purchase-details" state={{ from: order.orderItems, oid:order.orderId,address:order.address}} className="gap-2">
                      <FaEye />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>)}
      </Row>
    </section>
  )
}

export default Purchase
