import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Col, Container, Row } from "react-bootstrap"
import { GiRobotAntennas } from "react-icons/gi";
import { HiExternalLink } from "react-icons/hi";
import { FaShippingFast } from "react-icons/fa";



const PurchaseDetails = () => {
  const location = useLocation()
  const { from, oid, address } = location.state
 
  return (
    <section className="container mt-3 mb-5 ">
      <Row className="justify-content-center">
        <Col md={8} className="pt-5">
          <h4 className='mb-3'>Purchase Details:OrderNo.#{oid}</h4>
          <h6><FaShippingFast />&nbsp;&nbsp;Delivery Address: {address}</h6>
        </Col>
        <Col md={8} className="pb-3">
          <div className="d-grid gap-2 d-md-flex mt-2">
            <Link to={"/my-purchase"} className="">
              <HiExternalLink />&nbsp;Back to List
            </Link>
          </div>
        </Col>
        <Col md={8} >
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Order No.</th>
                <th scope="col">ProductName</th>
                <th scope="col">Quantity</th>
                <th scope="col">Per Price</th>
              </tr>
            </thead>
            <tbody>
              {from.map((item) => (
                <tr key={item.itemId}>
                  <th scope="row">#{item.orderId}</th>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.productPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </section>
  )
}

export default PurchaseDetails
